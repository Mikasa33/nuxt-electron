import fs from 'node:fs'
import path from 'node:path'
import { type Client, createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { app } from 'electron'
import { createTables } from './init'

const dbName = 'db.sqlite'
const dbPath = app.isPackaged
  ? path.join(app.getPath('userData'), dbName)
  : path.join('.data', dbName)

let client: Client

export function db() {
  return drizzle(client)
}

// 连接数据库
export async function connectDatabase() {
  const exist = fs.existsSync(dbPath)
  client = createClient({ url: `file:${dbPath}` })
  if (!exist) {
    await createTables(client)
  }
}
