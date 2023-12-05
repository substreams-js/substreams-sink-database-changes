import { Static, Type } from "@sinclair/typebox";

export const TableChangeOperation = Type.Enum({
  UNSPECIFIED: "OPERATION_UNSPECIFIED",
  CREATE: "OPERATION_CREATE",
  UPDATE: "OPERATION_UPDATE",
  DELETE: "OPERATION_DELETE",
});

export const Field = Type.Object({
  name: Type.String(),
  newValue: Type.String(),
  oldValue: Type.String(),
});

export const CompositePrimaryKey = Type.Object({
  keys: Type.Array(Type.Tuple([Type.String(), Type.String()])),
});

export const PrimaryKey = Type.Union([
  Type.Object({
    pk: Type.String(),
  }),
  Type.Object({
    compositePk: CompositePrimaryKey,
  }),
]);

export const TableChange = Type.Intersect([
  Type.Object({
    table: Type.String(),
    ordinal: Type.String(),
    operation: TableChangeOperation,
    fields: Type.Array(Field),
  }),
  PrimaryKey,
]);

export const DatabaseChanges = Type.Object({
  tableChanges: Type.Array(TableChange),
});

export type TableChangeOperation = Static<typeof TableChangeOperation>;
export type Field = Static<typeof Field>;
export type TableChange = Static<typeof TableChange>;
export type DatabaseChanges = Static<typeof DatabaseChanges>;
export type PrimaryKey = Static<typeof PrimaryKey>;
export type CompositePrimaryKey = Static<typeof CompositePrimaryKey>;
