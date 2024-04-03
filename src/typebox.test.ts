import { test } from "vitest";
import { PrimaryKey } from "./typebox.js";

test("PrimaryKey", () => {
  ({ pk: "1" }) as PrimaryKey;
  ({ compositePk: { keys: {"key1": "value1"} } }) as PrimaryKey;
});
