import type { ElectronAPI } from '@electron-toolkit/preload'
import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  window.electron = electronAPI
}

declare global {
  interface Window {
    electron: ElectronAPI
  }
}
