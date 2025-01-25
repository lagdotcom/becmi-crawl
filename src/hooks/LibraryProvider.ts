import {
  createContext,
  DependencyList,
  useCallback,
  useContext,
  useEffect,
} from "react";

import Engine from "../engine/Engine";
import { EngineEventHandler, EngineEventName } from "../engine/events";
import Library from "../engine/Library";

const throwError = () => {
  throw new Error(`missing LibraryContext`);
};

export const LibraryContext = createContext<Library>({
  engine: new Proxy({}, { get: throwError }) as Engine,
  modules: new Map(),
  begin: throwError,
  register: throwError,
});

export const useLibrary = () => useContext(LibraryContext);
export const useEngine = () => useLibrary().engine;

export const useEngineEvent = <E extends EngineEventName>(
  event: E,
  handler: EngineEventHandler<E>,
  depends: DependencyList = [],
) => {
  const engine = useEngine();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedHandler = useCallback(handler, depends);

  useEffect(() => {
    return engine.on(event, memoizedHandler);
  }, [engine, event, memoizedHandler]);
};
