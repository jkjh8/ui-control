import { SoundcraftUI } from 'soundcraft-ui-connection'
import db from '../db'
import { refreshList } from '../functions'
import { master, masterchannels } from './master'
import { aux_master, aux_channels } from './auxes'
import { fx_master, fx_channels } from './fx'
import hardware from './hw'
import solo from './solo'
import muteGroup from './muteGroup'
import player from './player'
import recorder from './record'
import show from './show'

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
      if (!uis[ui.ipaddress]) {
        reject({ e: 'device', message: 'Device Not Connected' })
      }

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
            break
          } else {
            bus = uis[ui.ipaddress].aux(args.buschannel)
            if (args.channeltype) {
              rt = await aux_channels(bus, ui, args)
            } else {
              rt = await aux_master(bus, ui, args)
            }
          }
          break
        case 'fx':
          if (!args.buschannel) {
            error = 'FX Buses Channel Error'
            break
          } else {
            bus = uis[ui.ipaddress].fx(args.buschannel)
            if (args.channeltype) {
              rt = await fx_channels(bus, ui, args)
            } else {
              rt = await fx_master(bus, ui, args)
            }
          }
          break
        case 'hw':
          if (!args.buschannel) {
            error = 'HW Buses Channel Error'
            break
          }
          bus = uis[ui.ipaddress].hw(args.buschannel)
          rt = await hardware(bus, ui, args)
          break
        case 'solo':
          rt = await solo(uis[ui.ipaddress].solo, ui, args)
          break
        case 'headphone':
          if (!args.buschannel) {
            error = 'HEADPHONE Buses Channel Error'
            break
          }
          rt = await solo(
            uis[ui.ipaddress].headphone(args.buschannel),
            ui,
            args
          )
          break
        case 'mutegroup':
          if (!args.buschannel) {
            error = 'MUTEGROUP Buses Channel Error'
            break
          }
          rt = await muteGroup(
            uis[ui.ipaddress].muteGroup(args.buschannel),
            ui,
            args
          )
          break
        case 'player':
          rt = await player(uis[ui.ipaddress].player, ui, args)
          break
        case 'recorder':
          rt = await recorder(uis[ui.ipaddress].recorderDualTrack, ui, args)
          break
        case 'show':
          rt = await show(uis[ui.ipaddress].shows, ui, args)
          break
        default:
          error = 'Unknown Mix Bus'
          break
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
