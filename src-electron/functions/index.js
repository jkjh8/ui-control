import { BrowserWindow } from 'electron'
import db from '../db'

async function refreshList() {
  const list = await db.list.find()
  BrowserWindow.fromId(1).webContents.send('onResponse', {
    command: 'list',
    value: list
  })
}

async function addNewDevice(args) {
  db.list.update(
    { ipaddress: args.ipaddress },
    { $set: { ...args } },
    { upsert: true }
  )
}

export { refreshList, addNewDevice }
