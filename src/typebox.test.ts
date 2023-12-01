import { test } from "vitest";
import { PrimaryKey } from "./typebox.js";

test("PrimaryKey", () => {
    ({ id: "1" }) as PrimaryKey;
    ({ composite_pk: {keys: [["1", "2"]]} }) as PrimaryKey;
});