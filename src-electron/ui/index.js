import { SoundcraftUI } from 'soundcraft-ui-connection'
import db from '../db'
import { refreshList } from '../functions'
import master from './master'

const uis = {}

function connect(ipaddress) {
  return new Promise((resolve, reject) => {
    try {
      if (uis[ipaddress]) {
        uis[ipaddress].reconnect()
      } else {
        uis[ipaddress] = new SoundcraftUI(ipaddress)
        uis[ipaddress].connect()
      }
      uis[ipaddress].status$.subscribe(async (status) => {
        await parsing(ipaddress, status)
      })
      resolve(uis)
    } catch (e) {
      reject(e)
    }
  })
}

function disconnect(ipaddress) {
  console.log('disconnect', ipaddress, uis)
  return new Promise(async (resolve, reject) => {
    try {
      await db.list.update(
        { ipaddress: ipaddress },
        { $set: { status: 'Disconnect' } }
      )
      if (uis[ipaddress]) {
        console.log('update')
        uis[ipaddress].disconnect()
        delete uis[ipaddress]
      }
      resolve(uis)
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

async function command(args) {
  return new Promise(async (resolve, reject) => {
    try {
      setTimeout(() => {
        reject({ e: 'timeout', message: 'Command Process Timeout' })
      }, 5000)

      if (!args.id) {
        resolve('ID Error')
      }
      if (!args.bus) {
        resolve('MixBus Error')
      }

      const ui = await db.list.findOne({ id: args.id })
      // if (!uis[ui.ipaddress]) {
      //   reject({ e: 'device', message: 'Device Not Connected' })
      // }

      if (args.bus === 'master') {
        const rt = master(uis[ui.ipaddress], args)
        if (rt) {
          resolve(rt)
        }
      }
    } catch (e) {
      reject({ e: 'command', message: e })
    }
  })
}

export default { connect, disconnect, command }
