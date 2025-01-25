import { BECMIChar, CharData } from "../types";

export default class EngineChar implements BECMIChar {
  constructor(
    private data: CharData,
    public id = data.id,
    public name = data.name,
    public characterClass = data.characterClass,
    public level = data.level,
    public abilities = data.abilities,
    public ac = data.ac,
    public hp = data.hp,
    public hpMax = data.hpMax,
    public money = data.money,
    public xp = data.xp,
  ) {}
}
