import { PropsWithChildren } from "react";
import {
  Button,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
} from "react-aria-components";

import { useEngine } from "../../hooks/LibraryProvider";
import { adjustmentToString, getAdjustment, getXPToNextLevel } from "../../lib";
import { Alignment, BECMIChar, BECMIItem } from "../../types";
import styles from "./PartyDisplay.module.scss";

function Datum({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <div className={styles.datum}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{children}</div>
    </div>
  );
}

function AbilityDatum({
  ability,
  score,
  adjustment,
}: {
  ability: string;
  score: number;
  adjustment: string;
}) {
  return (
    <div className={styles.abilityDatum}>
      <div className={styles.score}>{score}</div>
      <div className={styles.label}>{ability}</div>
      <div className={styles.adjustment}>
        {adjustmentToString(getAdjustment(score))}
      </div>
      <div className={styles.adjustmentLabel}>{adjustment}</div>
    </div>
  );
}

const categoryIcons = {
  ammo: "🏹",
  armor: "🛡️",
  shield: "🛡️",
  weapon: "🗡️",
};

function ItemDatum({ value }: { value: BECMIItem }) {
  return (
    <div className={styles.itemDatum}>
      <div className={styles.status}>{value.identified ? "" : "?"}</div>
      <div className={styles.equipped}>{value.equipped ? "E" : ""}</div>
      <div className={styles.category}>{categoryIcons[value.category]}</div>
      <div className={styles.name}>{value.name}</div>
      {value.qty > 1 && <div className={styles.qty}>{value.qty}</div>}
    </div>
  );
}

const alignmentLabels: Record<Alignment, string> = {
  C: "Chaotic",
  N: "Neutral",
  L: "Lawful",
};

function CharDisplay({ char }: { char: BECMIChar }) {
  return (
    <div>
      <Datum label="Name">{char.name}</Datum>
      <Datum label="Class">{char.characterClass}</Datum>
      <Datum label="Alignment">{alignmentLabels[char.alignment]}</Datum>
      <Datum label="Level">{char.level}</Datum>
      <Datum label="AC">{char.ac}</Datum>
      <Datum label="HP">
        {char.hp}/{char.hpMax}
      </Datum>
      <Datum label="XP">
        {char.xp}/{getXPToNextLevel(char)}
      </Datum>

      <Heading>Abilities</Heading>
      <AbilityDatum
        ability="Str"
        score={char.abilities.str}
        adjustment="attack, damage, open doors"
      />
      <AbilityDatum
        ability="Int"
        score={char.abilities.int}
        adjustment="language(s)"
      />
      <AbilityDatum
        ability="Wis"
        score={char.abilities.wis}
        adjustment="saving throws vs. spells"
      />
      <AbilityDatum
        ability="Dex"
        score={char.abilities.dex}
        adjustment="missile attack rolls, ac bonus"
      />
      <AbilityDatum
        ability="Con"
        score={char.abilities.con}
        adjustment="hit points/level"
      />
      <AbilityDatum
        ability="Cha"
        score={char.abilities.str}
        adjustment="reactions"
      />

      <Heading>Equipment</Heading>
      {char.equipped.map((item, i) => (
        <ItemDatum key={i} value={item} />
      ))}
      {char.carrying.map((item, i) => (
        <ItemDatum key={i} value={item} />
      ))}
    </div>
  );
}

export default function PartyDisplay() {
  const engine = useEngine();
  const party = engine.party;

  return (
    <DisclosureGroup>
      {party.map((char, i) => (
        <Disclosure key={i}>
          <Button slot="trigger">
            {char.name} ({char.characterClass} {char.level})
          </Button>
          <DisclosurePanel>
            <CharDisplay char={char} />
          </DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
