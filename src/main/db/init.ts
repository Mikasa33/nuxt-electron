import type { Client } from "@libsql/client"

// 创建表
export async function createTables(client: Client) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        email TEXT NOT NULL,
        remark TEXT
    );
  `
  await client.execute(createTableQuery)
  await insertInitialData(client)
}

// 插入初始数据
export async function insertInitialData(client: Client) {
  const insertQuery = `
    INSERT INTO users (name, age, email) VALUES ('John Doe', 30, 'xxx');
  `
  await client.execute(insertQuery)
}
