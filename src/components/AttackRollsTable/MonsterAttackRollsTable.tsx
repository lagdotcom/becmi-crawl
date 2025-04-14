import { useMemo } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

import { getAttackRollByHD } from "../../lib";

interface Props {
  min?: number;
  max?: number;
}

export default function MonsterAttackRollsTable({
  min = -20,
  max = 19,
}: Props) {
  const acs = useMemo(() => {
    const items = [];
    for (let i = max; i >= min; i--) items.push(i);
    return items;
  }, [min, max]);

  const results = useMemo(() => {
    const makeRow = (heading: string, hd: number) => {
      const row = [heading];

      for (const ac of acs) {
        const [atk, bd] = getAttackRollByHD(hd, 0, ac);
        row.push(isNaN(bd) ? atk.toFixed(0) : `${bd}†`);
      }
      return row;
    };

    return [
      makeRow("Up to 1", 1),
      makeRow("1+ to 2", 2),
      makeRow("2+ to 3", 3),
      makeRow("3+ to 4", 4),
      makeRow("4+ to 5", 5),
      makeRow("5+ to 6", 6),
      makeRow("6+ to 7", 7),
      makeRow("7+ to 8", 8),
      makeRow("8+ to 9", 9),
      makeRow("9+ to 11", 11),
      makeRow("11+ to 13", 12),
      makeRow("13+ to 15", 14),
      makeRow("15+ to 17", 16),
      makeRow("17+ to 19", 18),
      makeRow("19+ to 21", 20),
      makeRow("21+ to 23", 22),
      makeRow("23+ to 25", 24),
      makeRow("25+ to 27", 26),
      makeRow("27+ to 29", 28),
      makeRow("29+ to 31", 30),
      makeRow("31+ to 33", 32),
      makeRow("33+ to 35", 34),
      makeRow("35+ and up", 4000),
    ];
  }, [acs]);

  return (
    <Table>
      <TableHeader>
        <Column>Creature&apos;s Hit Dice</Column>
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
