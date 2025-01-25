import { BECMINode, NodeId, StateId } from "../types";
import EngineModule from "./EngineModule";

export default class EngineNode implements BECMINode {
  constructor(
    private mod: EngineModule,
    public id: NodeId,
    public enter: BECMINode["enter"],
  ) {}

  state<T>(id: StateId, defaultValue: T) {
    return this.mod.state(`${this.id}:${id}`, defaultValue);
  }
}
