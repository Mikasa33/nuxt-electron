import os from 'node:os'
import process from 'node:process'
import { registerIpcMain } from '@egoist/tipc/main'
import { app } from 'electron'
import { connectDatabase } from './db'
import { router } from './tipc'
import { restoreOrCreateWindow } from './window'

// 在 Windows 7 中禁用 GPU 加速
if (os.release().startsWith('6.1')) {
  app.disableHardwareAcceleration()
}

// 为 Windows 10+ 通知设置应用程序名称
if (process.platform === 'win32') {
  app.setAppUserModelId(app.getName())
}

// 初始化完成时
app
  .whenReady()
  // 连接数据库
  .then(connectDatabase)
  // 恢复或创建窗口
  .then(restoreOrCreateWindow)

// 当所有窗口都关闭时
app.on('window-all-closed', () => {
  app.quit()
})

// 使用 ipcMain.handle 将所有 tipc 路由器方法注册为 ipc 处理程序
registerIpcMain(router)
