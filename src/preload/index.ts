import { contextBridge } from "electron";
import { type ElectronAPI, electronAPI } from "@electron-toolkit/preload";

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
