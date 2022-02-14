import { BrowserWindow, ipcMain } from 'electron'

import db from '../db'
import ui from '../ui'

import { refreshList, addNewDevice } from '../functions'
import { createServer, distoryServer } from '../tcp'

ipcMain.handle('checkId', async (e, id) => {
  const exist = await db.list.find({ id: id })
  if (exist.length) {
    return exist[0]
  } else {
    return false
  }
})

ipcMain.handle('checkIp', async (e, ip) => {
  const exist = await db.list.find({ ipaddress: ip })
  if (exist.length) {
    return exist[0]
  } else {
    return false
  }
})

ipcMain.handle('checkServer', async () => {
  const r = await db.setup.findOne({ section: 'server' })
  if (r && r.status) {
    return { status: r.status, port: r.port }
  } else {
    return { status: false }
  }
})

ipcMain.on('onRequest', async (e, args) => {
  console.log('ipcmain', args)
  try {
    switch (args.command) {
      case 'refresh':
        await refreshList()
        break
      case 'add':
        const newDevice = JSON.parse(args.value)
        await addNewDevice(newDevice)
        await refreshList()
        break
      case 'delete':
        await db.list.remove({ _id: args.value })
        await refreshList()
        break
      case 'connect':
        if (args.status !== 'Disconnect' && args.status !== 'Close') {
          await ui.disconnect(args.ipaddress)
        } else {
          await db.list.update(
            { ipaddress: args.ipaddress },
            { $set: { status: 'Connecting' } }
          )
          await ui.connect(args.ipaddress)
        }
        refreshList()
        break
      // check last status and connect at start
      case 'start':
        const devices = await db.list.find()
        devices.forEach(async (device) => {
          if (device.status === 'Connect') {
            await ui.connect(device.ipaddress)
          }
        })
        break
      case 'start_server':
        createServer(args.port)
        break
      case 'stop_server':
        distoryServer()
        break
      case 'test':
        let testCode
        try {
          testCode = JSON.parse(args.code)
        } catch (e) {
          console.log(e)
          BrowserWindow.fromId(1).webContents.send('replay', 'Not Json Type')
          break
        }
        const r = await ui.command(testCode)
        console.log(r)
        BrowserWindow.fromId(1).webContents.send('replay', r)
        break
      default:
        console.log(args)
    }
  } catch (e) {
    console.error('ipc', e)
    if (e.message) {
      BrowserWindow.fromId(1).webContents.send('replay', e.message)
    }
  }
})
