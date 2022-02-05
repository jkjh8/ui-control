import { BrowserWindow, ipcMain } from 'electron'

import db from '../db'
import ui from '../ui'

import { refreshList, addNewDevice } from '../functions'
import { createServer, distoryServer } from '../tcp'

ipcMain.handle('checkId', async (e, id) => {
  const exist = await db.list.find({ id: id })
  if (exist.length) {
    return true
  } else {
    return false
  }
})

ipcMain.handle('checkIp', async (e, ip) => {
  const exist = await db.list.find({ ipaddress: ip })
  if (exist.length) {
    return true
  } else {
    return false
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
        if (args.status !== 'Disconnect') {
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
      case 'start_server':
        createServer(args.port)
        break
      case 'stop_server':
        distoryServer()
        break
      default:
        console.log(args)
    }
  } catch (e) {
    console.error(e)
  }
})
