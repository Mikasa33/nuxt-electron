import { createClient } from "@egoist/tipc/renderer";
import type { TipcRouter } from "~~/electron/tipc";

export const client = createClient<TipcRouter>({
  // 将 ipcRenderer.invoke 函数传递给客户端
  // 你可以在 BrowserWindow 的 preload.js 中暴露它
  ipcInvoke: window.ipcRenderer.invoke,
});
