import { BECMIState, StateId } from "../types";
import Engine from "./Engine";

export default class EngineState<T> implements BECMIState<T> {
  constructor(
    private engine: Engine,
    public id: StateId,
    public defaultValue: T,
  ) {}

  get() {
    return this.engine.getState<T>(this.id) ?? this.defaultValue;
  }

  set(value: T) {
    return this.engine.setState(this.id, value);
  }
}
