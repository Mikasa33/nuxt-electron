import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow, shell } from 'electron'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..', '..')
export const MAIN_DIST = path.join(process.env.APP_ROOT, '.electron')
process.env.VITE_PUBLIC = !app.isPackaged
  ? path.join(process.env.APP_ROOT, 'public')
  : path.join(process.env.APP_ROOT, '.output/public')

// 创建窗口
async function createWindow() {
  const browserWindow = new BrowserWindow({
    title: 'Nuxt Electron',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(MAIN_DIST, 'preload', 'index.mjs'),
    },
  })

  if (!app.isPackaged) {
    browserWindow.loadURL(process.env.VITE_DEV_SERVER_URL as string)
    // 如果应用程序没有打包，打开开发工具
    browserWindow.webContents.openDevTools()
  }
  else {
    browserWindow.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
  }

  // 让所有链接在浏览器中打开，而不是在应用程序中打开
  browserWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  return browserWindow
}

let browserWindow: BrowserWindow | undefined

// 恢复或创建窗口
export async function restoreOrCreateWindow() {
  // 确保应用程序只运行一个实例
  if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
  }

  browserWindow = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())

  if (browserWindow === undefined) {
    browserWindow = await createWindow()
  }

  if (browserWindow.isMinimizable()) {
    browserWindow.restore()
  }

  return browserWindow
}
