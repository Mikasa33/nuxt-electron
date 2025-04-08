// 创建表
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTables(client: any) {
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
  await insertInitialData(client);
}

// 插入初始数据
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function insertInitialData(client: any) {
  const insertQuery = `
    INSERT INTO users (name, age, email) VALUES ('John Doe', 30, 'xxx');
  `;
  await client.execute(insertQuery);
}
