import { tipc } from "@egoist/tipc/main";
import user from "./api/user";

export const { procedure } = tipc.create();

export const router = {
  ...user,
};

export type TipcRouter = typeof router;
