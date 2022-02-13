import func from './functions'

async function solo(ui, device, args) {
  try {
    let error
    let rt

    const command = args.command.toLowerCase()
    switch (command) {
      case 'setfaderlevel':
        rt = await func.setFaderLevel(ui, device, args.value)
        break
      case 'setfaderleveldb':
        rt = await func.setFaderLevelDB(ui, device, args.value)
        break
      case 'changefaderleveldb':
        rt = await func.changeFaderLevelDB(ui, device, args.value)
        break
      case 'fadeto':
        rt = await func.fadeTo(ui, device, args.value, args.time)
        break
      case 'fadetodb':
        rt = await func.fadeToDB(ui, device, args.value, args.time)
        break

      case 'getfaderlevel':
        rt = await func.faderLevel$(ui, device)
        break
      case 'getfaderleveldb':
        rt = await func.faderLevelDB$(ui, device)
        break
      default:
        error = 'Unknow Command'
        break
    }

    if (error) {
      return error
    } else {
      return rt
    }
  } catch (e) {
    console.error(e)
    return e
  }
}

export default solo
