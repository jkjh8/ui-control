import { SoundcraftUI } from 'soundcraft-ui-connection'
import db from '../db'
import { refreshList } from '../functions'

const ui = {}

function connect(ipaddress) {
  return new Promise((resolve, reject) => {
    try {
      if (ui[ipaddress]) {
        ui[ipaddress].reconnect()
      } else {
        ui[ipaddress] = new SoundcraftUI(ipaddress)
        ui[ipaddress].connect()
      }
      ui[ipaddress].status$.subscribe(async (status) => {
        await parsing(ipaddress, status)
      })
      resolve(ui)
    } catch (e) {
      reject(e)
    }
  })
}

function disconnect(ipaddress) {
  console.log('disconnect', ipaddress, ui)
  return new Promise(async (resolve, reject) => {
    try {
      await db.list.update(
        { ipaddress: ipaddress },
        { $set: { status: 'Disconnect' } }
      )
      if (ui[ipaddress]) {
        console.log('update')
        ui[ipaddress].disconnect()
        delete ui[ipaddress]
      }
      resolve(ui)
    } catch (e) {
      reject(e)
    }
  })
}

async function parsing(ipaddress, args) {
  try {
    switch (args.type) {
      case 'OPEN':
        await db.list.update(
          { ipaddress: ipaddress },
          { $set: { status: 'Connecting' } }
        )
        break
      case 'OPNING':
        await db.list.update(
          { ipaddress: ipaddress },
          { $set: { status: 'Connecting' } }
        )
        break
      case 'CLOSE':
        console.log('close')
        await db.list.update(
          { ipaddress: ipaddress },
          { $set: { status: 'Close' } }
        )
        break
      case 'CLOSING':
        await db.list.update(
          { ipaddress: ipaddress },
          { $set: { status: 'Closing' } }
        )
        break
      case 'ERROR':
        await db.list.update(
          { ipaddress: ipaddress },
          { $set: { status: 'Error' } }
        )
        break
      case 'RECONNECTING':
        console.log('reconnect')
        await db.list.update(
          { ipaddress: ipaddress },
          { $set: { status: 'Reconnecting' } }
        )
        break
      default:
        console.log(ipaddress, args)
        break
    }
    await refreshList()
  } catch (e) {
    console.error(e)
  }
}

export default { connect, disconnect }
