import { db } from "../db";
import { users } from "../db/schema/users";
import { procedure } from "../tipc";

export default {
  // 新增用户
  add: procedure
    .input<{ name: string; age: number; email: string; remark: string }>()
    .action(async ({ input }) => {
      return db()
        .insert(users)
        .values({
          name: input.name,
          age: input.age,
          email: input.email,
          remark: input.remark,
        })
        .returning();
    }),
  // 查询用户列表
  list: procedure.action(async () => {
    return db().select().from(users);
  }),
};
