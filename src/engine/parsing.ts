export type Datum = string | number | true | Datum[];
export type DataDict = Record<string, Datum>;

const digits = "0123456789";
const numeric = digits + ".";

class Parser {
  constructor(
    public src: string,
    public index = 0,
  ) {}

  eof() {
    return this.index >= this.src.length;
  }

  peek() {
    return this.src[this.index];
  }

  skip() {
    while (!this.eof() && this.peek() === " ") this.next();
  }

  next() {
    if (this.eof()) throw new Error(`next after eof`);

    const ch = this.peek();
    this.index += 1;
    return ch;
  }
}

type Checker<T> = (value: unknown) => value is T;

const isArrayOf =
  <T>(checker: Checker<T>) =>
  (value: unknown): value is T[] => {
    if (!Array.isArray(value)) return false;

    for (const item of value) {
      if (!checker(item)) return false;
    }
    return true;
  };

const isNumber = (value: unknown) => typeof value === "number";
const isNumberArray = isArrayOf(isNumber);
const isString = (value: unknown) => typeof value === "string";

export class Dict {
  constructor(private data: Partial<DataDict>) {}

  get(key: string) {
    return this.data[key];
  }

  toString() {
    return Object.entries(this.data)
      .map(([key, value]) => `${key}=${value}`)
      .join(" ");
  }

  private getter =
    <T>(typeName: string, check: Checker<T>) =>
    (key: string): T | undefined => {
      const value = this.data[key];
      if (typeof value === "undefined" || check(value)) return value;
      throw new Error(`${key} expected ${typeName}`);
    };

  num = this.getter("number", isNumber);
  numArray = this.getter("number[]", isNumberArray);
  str = this.getter("string", isString);
}

class DataDictParser extends Parser {
  constructor(
    public src: string,
    public index = 0,
    public data: DataDict = {},
  ) {
    super(src, index);
  }

  parse() {
    this.skip();

    while (!this.eof()) {
      this.key();
      this.skip();
    }

    return new Dict(this.data);
  }

  key() {
    let key = "";
    while (true) {
      const ch = this.next();
      if (ch === "=") break;
      else if (ch === " ") {
        this.data[key] = true;
        return;
      }

      key += ch;
    }

    const value = this.value();
    this.data[key] = value;
  }

  value() {
    const ch = this.next();
    if (ch === '"') return this.str(ch);
    if (ch === "[") return this.arr();
    if (digits.includes(ch)) return this.num(ch);

    throw new Error(`invalid value char: ${ch}`);
  }

  str(quote: string) {
    let value = "";
    let escape = false;
    while (true) {
      const ch = this.next();

      if (escape) {
        value += ch;
        escape = false;
        continue;
      }

      if (ch === "\\") {
        escape = true;
        continue;
      }

      if (ch === quote) return value;
      value += ch;
    }
  }

  arr() {
    this.skip();
    if (this.peek() === "]") return [];

    const values: Datum[] = [];
    while (true) {
      values.push(this.value());
      this.skip();

      const ch = this.next();
      if (ch === "]") return values;
      else if (ch !== ",") throw new Error(`missing , between array values`);
    }
  }

  num(value: string) {
    while (true) {
      const ch = this.peek();
      if (!numeric.includes(ch)) return Number(value);
      value += this.next();
    }
  }
}

export function dataDict(line: string, index = 0) {
  return new DataDictParser(line, index).parse();
}
