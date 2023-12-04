import { TableChange } from "./zod.js";

export function getValuesInTableChange(change: TableChange) {
  const values: Record<string, unknown> = {};
  for (const field of change.fields) {
    values[field.name] = field.newValue;
  }
  return values;
}
