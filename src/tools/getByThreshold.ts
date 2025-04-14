import { ThresholdTable } from "../types";

export default function getByThreshold<T, D>(
  value: T,
  table: ThresholdTable<T, D>,
) {
  for (let i = 0; i < table.length; i++) {
    const [threshold, data] = table[i];
    if (threshold === value) return data;
    if (threshold > value) {
      if (i === 0) throw new Error(`${value} below lowest threshold in table`);
      return table[i - 1][1];
    }
  }

  return table[table.length - 1][1];
}

export function getByThresholdLE<T, D>(value: T, table: ThresholdTable<T, D>) {
  for (const [threshold, data] of table) if (value <= threshold) return data;

  return table[table.length - 1][1];
}
