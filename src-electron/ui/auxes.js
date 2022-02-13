import func from './functions'

async function aux_master(ui, device, args) {
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
      case 'mute':
        rt = await func.mute(ui, device)
        break
      case 'unmute':
        rt = await func.unmute(ui, device)
        break
      case 'setmute':
        rt = await func.setMute(ui, device, value)
        break
      case 'togglemute':
        rt = await func.toggleMute(ui, device)
        break
      case 'pan':
        rt = await func.pan(ui, device, args.value)
        break
      case 'solo':
        rt = await func.solo(current, device)
        break
      case 'unsolo':
        rt = await func.unsolo(current, device)
        break
      case 'togglesolo':
        rt = await func.toggleSolo(current, device)
        break

      // aux
      case 'pre':
        rt = await func.pre(current, device)
        break

      case 'post':
        rt = await func.post(current, device)
        break

      case 'togglepost':
        rt = await func.togglePost(current, device)
        break

      case 'setpost':
        rt = await func.setPost(current, device, args.value)
        break

      case 'preproc':
        rt = await func.preProc(current, device)
        break

      case 'postproc':
        rt = await func.postProc(current, device)
        break

      case 'setpostproc':
        rt = await func.setPostProc(current, device, args.value)
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
      case 'getmute':
        rt = await func.mute$(current, device)
        break
      case 'getsolo':
        rt = await func.solo$(currnet, device)
        break
      case 'getpost':
        rt = await func.post$(current, device)
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

async function aux_channels(ui, device, args) {
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
      case 'fx':
        current = ui.fx(channel)
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

      case 'pre':
        rt = await func.pre(current, device)
        break

      case 'post':
        rt = await func.post(current, device)
        break

      case 'togglepost':
        rt = await func.togglePost(current, device)
        break

      case 'setpost':
        rt = await func.setPost(current, device, args.value)
        break

      case 'preproc':
        rt = await func.preProc(current, device)
        break

      case 'postproc':
        rt = await func.postProc(current, device)
        break

      case 'setpostproc':
        rt = await func.setPostProc(current, device, args.value)
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
      case 'getmute':
        rt = await func.mute$(current, device)
        break

      case 'getpost':
        rt = await func.post$(current, device)
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
export { aux_master, aux_channels }
