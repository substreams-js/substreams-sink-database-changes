import z from "zod";

export const TableChangeOperation = z.enum([
  "OPERATION_UNSPECIFIED",
  "OPERATION_CREATE",
  "OPERATION_UPDATE",
  "OPERATION_DELETE",

  // legacy operations
  "UNSET",
  "CREATE",
  "UPDATE",
  "DELETE",
]);

export const Field = z.object({
  name: z.string(),
  newValue: z.optional(z.string()),
  oldValue: z.optional(z.string()),
});

export const CompositePrimaryKey = z.object({
  keys: z.record(z.string()),
});

export const PrimaryKey = z.union([
  z.object({
    pk: z.string(),
  }),
  z.object({
    compositePk: CompositePrimaryKey,
  }),
]);

export const TableChange = z
  .object({
    table: z.string(),
    ordinal: z.optional(z.string().transform((str: string) => parseInt(str))),
    operation: TableChangeOperation,
    fields: z.array(Field),
  })
  .and(PrimaryKey);

export const DatabaseChanges = z.object({
  tableChanges: z.array(TableChange),
});

export type TableChangeOperation = z.infer<typeof TableChangeOperation>;
export type Field = z.infer<typeof Field>;
export type TableChange = z.infer<typeof TableChange>;
export type DatabaseChanges = z.infer<typeof DatabaseChanges>;
export type PrimaryKey = z.infer<typeof PrimaryKey>;
export type CompositePrimaryKey = z.infer<typeof CompositePrimaryKey>;
