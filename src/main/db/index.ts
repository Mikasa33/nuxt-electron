import fs from "node:fs";
import path from "node:path";
import { app } from "electron";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { createTables } from "./init";

const dbName = "db.sqlite";
const dbPath = app.isPackaged
  ? path.join(app.getPath("userData"), dbName)
  : path.join(".data", dbName);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: any;

export function db() {
  return drizzle(client);
}

// 连接数据库
export async function connectDatabase() {
  const exist = fs.existsSync(dbPath);
  client = createClient({ url: `file:${dbPath}` });
  if (!exist) {
    await createTables(client);
  }
}
