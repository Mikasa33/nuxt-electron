import { tipc } from '@egoist/tipc/main'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema/users'

const t = tipc.create()

export default {
  // 新增用户
  addUser: t.procedure
    .input<{ name: string, age: number, email: string, remark: string }>()
    .action(async ({ input }) => {
      return db()
        .insert(users)
        .values({
          name: input.name,
          age: input.age,
          email: input.email,
          remark: input.remark,
        })
        .returning()
    }),
  deleteUser: t.procedure
    .input<{ id: number }>()
    .action(async ({ input }) => {
      return db()
        .delete(users)
        .where(eq(users.id, input.id))
        .returning()
    }),
  // 查询用户列表
  listUser: t.procedure.action(async () => {
    return db().select().from(users)
  }),
}
