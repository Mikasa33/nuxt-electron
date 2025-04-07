import fs from "node:fs";
import path from "node:path";
import { app } from "electron";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const dbName = "db.sqlite";
const dbPath = app.isPackaged
  ? path.join(app.getPath("userData"), dbName)
  : path.join(".data", dbName);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: any;

export function db() {
  return drizzle(client);
}

// 初始化数据库
export async function initDatabase() {
  const exist = fs.existsSync(dbPath);
  client = createClient({ url: `file:${dbPath}` });
  if (!exist) {
    await createTables();
  }
}

// 创建表
async function createTables() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        email TEXT NOT NULL,
        remark TEXT
    );
  `;
  await client.execute(createTableQuery);
  await insertInitialData();
}

// 插入初始数据
async function insertInitialData() {
  const insertQuery = `
    INSERT INTO users (name, age, email) VALUES ('John Doe', 30, 'xxx');
  `;
  await client.execute(insertQuery);
}
