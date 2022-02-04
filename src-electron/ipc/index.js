import { BrowserWindow, ipcMain } from 'electron'

import db from '../db'

ipcMain.on('onRequest', async (e, args) => {
  console.log('ipcmain', args)
})
