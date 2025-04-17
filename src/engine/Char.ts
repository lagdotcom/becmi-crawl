import { getAdjustment } from "../lib";
import { Item } from "../state/items";
import { BECMIChar, CharData } from "../types";
import { convertToEngineItem, EngineItem } from "./Item";

export default class EngineChar implements BECMIChar {
  items: EngineItem[];

  constructor(
    data: CharData,
    items: Item[],
    public id = data.id,
    public name = data.name,
    public characterClass = data.characterClass,
    public level = data.level,
    public abilities = data.abilities,
    public alignment = data.alignment,
    public hp = data.hp,
    public hpMax = data.hpMax,
    public money = data.money,
    public xp = data.xp,
  ) {
    this.items = items
      .filter((i) => i.location === "pc" && i.who === data.id)
      .map(convertToEngineItem);
  }

  get equipped() {
    return this.items.filter((i) => i.equipped);
  }

  get armor() {
    return this.equipped.find((i) => i.category === "armor");
  }

  get shield() {
    return this.equipped.find((i) => i.category === "shield");
  }

  get ammo() {
    return this.equipped.filter((i) => i.category === "ammo");
  }

  get weapons() {
    return this.equipped.filter((i) => i.category === "weapon");
  }

  get carrying() {
    return this.items.filter((i) => !i.equipped);
  }

  get ac() {
    const { armor, shield } = this;
    const dexAdjustment = getAdjustment(this.abilities.dex);

    // TODO magical ac bonuses etc.
    return (armor?.ac ?? 9) + (shield?.acBonus ?? 0) - dexAdjustment;
  }
}
