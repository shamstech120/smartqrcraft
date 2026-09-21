// Tiny async database adapter. The app only uses get / all / run / batch, so the same code can run on
// Cloudflare D1 later by writing a second adapter with the same four methods.
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS = path.join(here, "..", "db", "migrations");

export function openDb(file = ":memory:") {
  if (file !== ":memory:") fs.mkdirSync(path.dirname(file), { recursive: true });
  const raw = new DatabaseSync(file);
  raw.exec("pragma foreign_keys = on;");
  if (file !== ":memory:") raw.exec("pragma journal_mode = wal;");

  // migrations run once each, in file-name order
  raw.exec("create table if not exists schema_migrations (name text primary key)");
  const done = new Set(raw.prepare("select name from schema_migrations").all().map((r) => r.name));
  for (const f of fs.readdirSync(MIGRATIONS).filter((n) => n.endsWith(".sql")).sort()) {
    if (done.has(f)) continue;
    raw.exec("begin");
    try {
      raw.exec(fs.readFileSync(path.join(MIGRATIONS, f), "utf8"));
      raw.prepare("insert into schema_migrations(name) values (?)").run(f);
      raw.exec("commit");
    } catch (e) {
      raw.exec("rollback");
      throw e;
    }
  }

  const plain = (row) => (row ? { ...row } : null);
  return {
    async get(sql, params = []) {
      return plain(raw.prepare(sql).get(...params));
    },
    async all(sql, params = []) {
      return raw.prepare(sql).all(...params).map((r) => ({ ...r }));
    },
    async run(sql, params = []) {
      const r = raw.prepare(sql).run(...params);
      return { changes: Number(r.changes), lastId: Number(r.lastInsertRowid) };
    },
    close() {
      raw.close();
    },
  };
}
