import { BECMIMenuBuilder, BECMINode } from "../types";

export interface MenuOption {
  value: string;
  node: BECMINode;
}

export default class EngineMenuBuilder implements BECMIMenuBuilder {
  options: MenuOption[];

  constructor() {
    this.options = [];
  }

  option(value: string, node: BECMINode) {
    this.options.push({ value, node });
  }
}
