import { SoundcraftUI } from 'soundcraft-ui-connection'
import db from '../db'
import { refreshList } from '../functions'
import { master, masterchannels } from './master'

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
          { $set: { status: 'Connect' } }
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

      let bus
      let error = null
      let rt = null

      if (!args.id) {
        resolve('ID Error')
      }

      const ui = await db.list.findOne({ id: args.id })
      // if (!uis[ui.ipaddress]) {
      //   reject({ e: 'device', message: 'Device Not Connected' })
      // }

      switch (args.bus) {
        case 'master':
          bus = uis[ui.ipaddress].master
          if (args.channeltype) {
            rt = await masterchannels(bus, ui, args)
          } else {
            rt = await master(bus, ui, args)
          }
          break
        case 'aux':
          if (!args.buschannel) {
            error = 'AUX Buses Channel Error'
          }
          bus = ui.aux(args.buschannel)
          break
        case 'fx':
          if (!args.buschannel) {
            error = 'FX Buses Channel Error'
          }
          bus = ui.fx(args.buschannel)
          break
        case 'hw':
          if (!args.buschannel) {
            error = 'HW Buses Channel Error'
          }
          bus = ui.hw(args.buschannel)
          break
        case 'solo':
          bus = ui.volume.solo
          break
        case 'headphone':
          if (!args.buschannel) {
            error = 'HEADPHONE Buses Channel Error'
          }
          bus = ui.volume.headphone(args.buschannel)
          break
        case 'mutegroup':
          if (!args.buschannel) {
            error = 'MUTEGROUP Buses Channel Error'
          }
          bus = ui.mutegroup(args.buschannel)
          break
        case 'player':
          bus = ui.player
          break
        default:
          error = 'Unknown Mix Bus'
      }

      if (error) {
        reject(error)
      } else {
        resolve(rt)
      }

      // if (args.bus === 'master') {
      //   const rt = await master(uis[ui.ipaddress], ui, args)
      //   if (rt) {
      //     resolve(rt)
      //   }
      // }
    } catch (e) {
      reject({ e: 'command', message: e })
    }
  })
}

export default { connect, disconnect, command }
