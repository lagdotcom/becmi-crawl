import {
  ammoLibrary,
  armorLibrary,
  shieldLibrary,
  weaponLibrary,
} from "../lib";
import { Item } from "../state/items";
import {
  AmmoItem,
  AmmoOverrides,
  ArmorItem,
  ArmorOverrides,
  BECMIAmmo,
  BECMIArmor,
  BECMIShield,
  BECMIWeapon,
  ItemBase,
  ShieldItem,
  ShieldOverrides,
  WeaponItem,
  WeaponOverrides,
} from "../types";

abstract class AbstractItem<T extends ItemBase, OT extends Partial<T>> {
  name!: ItemBase["name"];
  value!: ItemBase["value"];
  weight!: ItemBase["weight"];

  constructor(
    protected info: Item,
    public qty = info.qty,
    public equipped = info.location !== "floor" && info.equipped,
    public identified = info.identified,
  ) {
    this.addProperty("name");
    this.addProperty("value");
    this.addProperty("weight");
  }

  abstract get base(): T;
  get overrides(): Partial<OT> {
    return this.info.overrides as Partial<OT>;
  }

  protected addProperty<K extends keyof T>(key: K) {
    Object.defineProperty(this, key, {
      get: () => (this.overrides[key] ?? this.base[key]) as T[K],
    });
  }
}

export class EngineAmmo
  extends AbstractItem<AmmoItem, AmmoOverrides>
  implements BECMIAmmo
{
  type!: AmmoItem["type"];

  constructor(
    info: Item,
    public category = "ammo" as const,
  ) {
    super(info);
    this.addProperty("type");
  }

  get base() {
    return ammoLibrary[this.info.base];
  }
}

export class EngineArmor
  extends AbstractItem<ArmorItem, ArmorOverrides>
  implements BECMIArmor
{
  ac!: ArmorItem["ac"];

  constructor(
    info: Item,
    public category = "armor" as const,
  ) {
    super(info);
    this.addProperty("ac");
  }

  get base() {
    return armorLibrary[this.info.base];
  }
}

export class EngineShield
  extends AbstractItem<ShieldItem, ShieldOverrides>
  implements BECMIShield
{
  acBonus!: ShieldItem["acBonus"];

  constructor(
    info: Item,
    public category = "shield" as const,
  ) {
    super(info);
    this.addProperty("acBonus");
  }

  get base() {
    return shieldLibrary[this.info.base];
  }
}

export class EngineWeapon
  extends AbstractItem<WeaponItem, WeaponOverrides>
  implements BECMIWeapon
{
  type!: WeaponItem["type"];
  size!: WeaponItem["size"];

  constructor(
    info: Item,
    public category = "weapon" as const,
  ) {
    super(info);
    this.addProperty("type");
    this.addProperty("size");
  }

  get base() {
    return weaponLibrary[this.info.base];
  }
}

export type EngineItem = EngineAmmo | EngineArmor | EngineShield | EngineWeapon;

export function convertToEngineItem(i: Item): EngineItem {
  switch (i.type) {
    case "ammo":
      return new EngineAmmo(i);
    case "armor":
      return new EngineArmor(i);
    case "shield":
      return new EngineShield(i);
    case "weapon":
      return new EngineWeapon(i);
  }
}
