import { test } from "vitest";
import { PrimaryKey } from "./typebox.js";

test("PrimaryKey", () => {
    ({ id: "1" }) as PrimaryKey;
    ({ compositePk: {keys: [["1", "2"]]} }) as PrimaryKey;
});