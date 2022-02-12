import func from './functions'

async function master(ui, device, args) {
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
      case 'pan':
        rt = await func.pan(ui, device, args.value)
        break
      case 'dim':
        rt = await func.dim(ui, device)
        break

      case 'undim':
        rt = await func.undim(ui, device)
        break
      case 'toggledim':
        rt = await func.toggleDim(ui, device)
        break
      case 'setdim':
        rt = await func.setDim(ui, device, args.value)
        break
      case 'getfaderlevel':
        rt = await func.faderLevel$(ui, device)
        break
      case 'getfaderleveldb':
        rt = await func.faderLevelDB$(ui, device)
        break
      case 'getpan':
        rt = await func.pan$(ui, device)
        break
      case 'getdim':
        rt = func.dim$(ui, device)
        break
      default:
        error = 'Unknown Command'
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

async function masterchannels(ui, device, args) {
  try {
    let error
    let rt
    let current
    const type = args.channeltype.toLowerCase()
    const channel = Number(args.channel)
    if (!channel) {
      return 'Please Select Channel'
    }

    switch (type) {
      case 'input':
        current = ui.input(channel)
        break
      case 'line':
        current = ui.line(channel)
        break
      case 'player':
        current = ui.player(channel)
        break
      case 'aux':
        current = ui.aux(channel)
        break
      case 'fx':
        current = ui.fx(channel)
        break
      case 'sub':
        current = ui.sub(channel)
        break
      case 'vca':
        current = ui.vca(channel)
        break
      default:
        error = 'Unknown Channel'
    }

    if (error) {
      return error
    }

    const command = args.command.toLowerCase()
    switch (command) {
      case 'setfaderlevel':
        rt = await func.setFaderLevel(current, device, args.value)
        break
      case 'setfaderleveldb':
        rt = await func.setFaderLevelDB(current, device, args.value)
        break
      case 'changefaderleveldb':
        rt = await func.changeFaderLevelDB(current, device, args.value)
        break
      case 'fadeto':
        rt = await func.fadeTo(current, device, args.value, args.time)
        break
      case 'fadetodb':
        rt = await func.fadeToDB(current, device, args.value, args.time)
        break
      case 'pan':
        rt = await func.pan(current, device, args.value)
        break
      case 'mute':
        rt = await func.mute(current, device)
        break
      case 'unmute':
        rt = await func.unmute(current, device)
        break
      case 'togglemute':
        rt = await func.toggleMute(current, device)
        break
      case 'setmute':
        rt = await func.setMute(current, device, args.value)
        break

      // subscribe
      case 'getfaderlevel':
        rt = await func.faderLevel$(current, device)
        break
      case 'getfaderleveldb':
        rt = await func.faderLevelDB$(current, device)
        break
      case 'getpan':
        rt = await func.pan$(current, device)
        break
      case 'getdim':
        rt = func.dim$(current, device)
        break
      case 'getmute':
        rt = await func.mute$(current, device)
        break

      default:
        error = 'Unknown Command'
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
export { master, masterchannels }
