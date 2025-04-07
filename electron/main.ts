import { app, BrowserWindow, shell } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
import process from "node:process";
import { registerIpcMain } from "@egoist/tipc/main";
import { router } from "./tipc";
import { initDatabase } from "./db";

// 使用 ipcMain.handle 将所有 tipc 路由器方法注册为 ipc 处理程序
registerIpcMain(router);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "../");
export const MAIN_DIST = path.join(process.env.APP_ROOT, ".electron");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : path.join(process.env.APP_ROOT, ".output/public");

// 在 Windows 7 中禁用 GPU 加速
if (os.release().startsWith("6.1")) app.disableHardwareAcceleration();

// 为 Windows 10+ 通知设置应用程序名称
if (process.platform === "win32") app.setAppUserModelId(app.getName());

// 确保应用程序只运行一个实例
if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null;

// 新建窗口
async function createWindow() {
  win = new BrowserWindow({
    title: "Nuxt Electron",
    icon: path.join(process.env.VITE_PUBLIC, "favicon.ico"),
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(MAIN_DIST, "preload.mjs"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    // 如果应用程序没有打包，打开开发工具
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, "index.html"));
  }

  // 让所有链接在浏览器中打开，而不是在应用程序中打开
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });
}

// 初始化完成时
app.whenReady().then(async () => {
  await initDatabase();
  createWindow();
});

// 当所有窗口都关闭时
app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// 当第二个实例已执行并调用时
app.on("second-instance", () => {
  if (win) {
    // 如果用户试图打开其他窗口，将焦点放在主窗口上
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

// 应用程序激活时
app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0]!.focus();
  } else {
    createWindow();
  }
});
