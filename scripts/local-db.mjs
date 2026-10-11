import { PGlite } from "@electric-sql/pglite";
import { createServer } from "pglite-server";
import { mkdirSync } from "node:fs";

const dataDir = process.env.PG_DATA_DIR || "./.dev-db";
mkdirSync(dataDir, { recursive: true });

const db = new PGlite(dataDir);
await db.waitReady;

const port = parseInt(process.env.PG_PORT || "5432", 10);
const server = createServer(db, { logLevel: 1 });

server.listen(port, "127.0.0.1", () => {
  console.log(`[local-db] PostgreSQL embebido activo en 127.0.0.1:${port}`);
  console.log(`[local-db] Datos almacenados en: ${dataDir}`);
});

process.on("SIGINT", async () => {
  server.close();
  await db.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  server.close();
  await db.close();
  process.exit(0);
});
