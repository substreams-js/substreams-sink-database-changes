import z from "zod";

export const TableChangeOperation = z.enum([
  "OPERATION_UNSPECIFIED",
  "OPERATION_CREATE",
  "OPERATION_UPDATE",
  "OPERATION_DELETE",
]);

export const Field = z.object({
  name: z.string(),
  newValue: z.string(),
  oldValue: z.string(),
});

export const TableChange = z.object({
  table: z.string(),
  id: z.string(),
  // TO-DO: handle oneof composite_pk
  ordinal: z.number(),
  operation: TableChangeOperation,
  fields: z.array(Field),
});

export const DatabaseChanges = z.object({
  tableChanges: z.array(TableChange),
});

export type TableChangeOperation = z.infer<typeof TableChangeOperation>;
export type Field = z.infer<typeof Field>;
export type TableChange = z.infer<typeof TableChange>;
export type DatabaseChanges = z.infer<typeof DatabaseChanges>;
