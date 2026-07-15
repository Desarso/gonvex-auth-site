import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("verification pages identify Gonvex Auth and cross-link required policies", async () => {
  const [about, privacy, terms] = await Promise.all([
    readFile(new URL("./index.html", import.meta.url), "utf8"),
    readFile(new URL("./privacy.html", import.meta.url), "utf8"),
    readFile(new URL("./terms.html", import.meta.url), "utf8"),
  ]);

  assert.match(about, /Gonvex Auth/);
  assert.match(about, /Continue to Gonvex Auth/);
  assert.match(about, /href="\/privacy"/);
  assert.match(about, /href="\/terms"/);
  assert.match(privacy, /Project-scoped access/);
  assert.match(terms, /Authentication role/);
});
