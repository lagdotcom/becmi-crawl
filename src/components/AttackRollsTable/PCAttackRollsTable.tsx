import { useMemo } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

import { getAttackRollByClass } from "../../lib";
import { CharacterClass } from "../../types";

interface Props {
  min?: number;
  max?: number;
}

export default function PCAttackRollsTable({ min = -20, max = 19 }: Props) {
  const acs = useMemo(() => {
    const items = [];
    for (let i = max; i >= min; i--) items.push(i);
    return items;
  }, [min, max]);

  const results = useMemo(() => {
    const makeRow = (
      row: string[],
      cl: CharacterClass | "Normal Man",
      lv = 0,
      xp = 0,
    ) => {
      for (const ac of acs) {
        const [atk, bd] = getAttackRollByClass(cl, lv, xp, ac);
        row.push(isNaN(bd) ? atk.toFixed(0) : `${bd}†`);
      }
      return row;
    };

    return [
      makeRow(["Normal Man", "", "", ""], "Normal Man"),
      makeRow(["1-5", "1-4", "1-3", ""], "Fighter", 1),
      makeRow(["6-10", "5-8", "4-6", ""], "Fighter", 4),
      makeRow(["11-15", "9-12", "7-9", "A"], "Fighter", 7),
      makeRow(["", "", "", "B"], "Halfling", 8, 300000),
      makeRow(["16-20", "13-16", "10-12", "C"], "Fighter", 10),
      makeRow(["", "", "", "D"], "Dwarf", 12, 800000),
      makeRow(["21-25", "17-20", "13-15", "E"], "Fighter", 13),
      makeRow(["", "", "", "F"], "Dwarf", 12, 1200000),
      makeRow(["26-30", "21-24", "16-18", "G"], "Fighter", 16),
      makeRow(["", "", "", "H"], "Dwarf", 12, 1600000),
      makeRow(["31-35", "25-28", "19-21", "I"], "Fighter", 19),
      makeRow(["", "", "", "J"], "Dwarf", 12, 2000000),
      makeRow(["36", "29-32", "22-24", "K"], "Fighter", 22),
      makeRow(["", "", "", "L"], "Dwarf", 12, 2400000),
      makeRow(["", "33-35", "25-27", "M"], "Fighter", 25),
      makeRow(["", "36", "28-30", ""], "Fighter", 28),
      makeRow(["", "", "31-33", ""], "Fighter", 31),
      makeRow(["", "", "34-36", ""], "Fighter", 34),
    ];
  }, [acs]);

  return (
    <Table>
      <TableHeader>
        <Column>MU</Column>
        <Column>C,T,D</Column>
        <Column>F*</Column>
        <Column>DH**</Column>
        {acs.map((ac) => (
          <Column key={ac}>{ac}</Column>
        ))}
      </TableHeader>
      <TableBody>
        {results.map((data, i) => (
          <Row key={i}>
            {data.map((item, j) => (
              <Cell key={j}>{item}</Cell>
            ))}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
}
