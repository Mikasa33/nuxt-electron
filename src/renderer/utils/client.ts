import type { Router } from '~~/src/main/tipc'
import { createClient } from '@egoist/tipc/renderer'

export const client = createClient<Router>({
  // 将 ipcRenderer.invoke 函数传递给客户端，你可以在 BrowserWindow 的 preload.js 中暴露它
  ipcInvoke: window.electron.ipcRenderer.invoke,
})
