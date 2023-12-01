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

export const CompositePrimaryKey = z.object({
  keys: z.array(z.tuple([z.string(), z.string()])),
});

export const PrimaryKey = z.union([
  z.object({
    id: z.string(),
  }),
  z.object({
    composite_pk: CompositePrimaryKey,
  })
]);

export const TableChange = z.union([
  // Simple primary key
  z.object({
    table: z.string(),
    id: z.string(),
    ordinal: z.number(),
    operation: TableChangeOperation,
    fields: z.array(Field),
  }),
  // Composite primary key
  z.object({
    table: z.string(),
    composite_pk: CompositePrimaryKey,
    ordinal: z.number(),
    operation: TableChangeOperation,
    fields: z.array(Field),
  })
]);

export const DatabaseChanges = z.object({
  tableChanges: z.array(TableChange),
});

export type TableChangeOperation = z.infer<typeof TableChangeOperation>;
export type Field = z.infer<typeof Field>;
export type TableChange = z.infer<typeof TableChange>;
export type DatabaseChanges = z.infer<typeof DatabaseChanges>;
export type PrimaryKey = z.infer<typeof PrimaryKey>;
export type CompositePrimaryKey = z.infer<typeof CompositePrimaryKey>;
