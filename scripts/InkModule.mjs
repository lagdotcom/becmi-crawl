/*eslint-env node*/

import { readFileSync } from "fs";
import { Compiler } from "inkjs/compiler/Compiler";
import path from "path";

/**
 * Coerces to a boolean.
 * @param {any} x
 * @param {boolean} defaultValue
 * @returns
 */
const bool = (x, defaultValue) => {
  if (typeof x === "undefined") return defaultValue;
  return !!x;
};

const InkModule = (options = {}) => ({
  name: "Ink",

  /**
   * @param {import("esbuild").PluginBuild} build
   */
  setup(build) {
    build.onResolve({ filter: /\.ink$/ }, (args) => {
      return {
        path: path.isAbsolute(args.path)
          ? args.path
          : path.join(args.resolveDir, args.path),
        namespace: "ink",
      };
    });

    build.onLoad({ filter: /.*/, namespace: "ink" }, (args) => {
      /** @type {import("esbuild").PartialMessage[]} */
      const warnings = [];
      /** @type {import("esbuild").PartialMessage[]} */
      const errors = [];
      const dir = path.dirname(args.path);
      let contents = "";

      try {
        const source = readFileSync(args.path, { encoding: "utf-8" });
        const compiler = new Compiler(source, {
          sourceFilename: args.path,
          countAllVisits: bool(options.countAllVisits, false),
          fileHandler: {
            ResolveInkFilename: (filename) => filename,
            LoadInkFileContents: (filename) =>
              readFileSync(path.join(dir, filename), { encoding: "utf-8" }),
          },
          errorHandler: (message, type) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
            if (type === 2)
              errors.push({
                text: message,
                location: {
                  file: args.path,
                  line: compiler.parser.lineIndex,
                  column: compiler.parser.characterInLineIndex,
                },
              });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
            else if (type === 1)
              warnings.push({
                text: message,
                location: {
                  file: args.path,
                  line: compiler.parser.lineIndex,
                  column: compiler.parser.characterInLineIndex,
                },
              });
          },
        });

        for (const msg of compiler.authorMessages) console.log(msg);

        contents = compiler.Compile().ToJson();
      } catch (e) {
        errors.push(e);
      }

      return { loader: "file", contents, warnings, errors };
    });
  },
});
export default InkModule;
