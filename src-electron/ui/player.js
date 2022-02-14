import func from './functions'

async function player(ui, device, args) {
  try {
    let error
    let rt

    const command = args.command.toLowerCase()
    switch (command) {
      case 'play':
        rt = await func.play(ui, device)
        break
      case 'pause':
        rt = await func.pause(ui, device)
        break
      case 'stop':
        rt = await func.stop(ui, device)
        break
      case 'next':
        rt = await func.next(ui, device)
        break
      case 'prev':
        rt = await func.prev(ui, device)
        break
      case 'loadplaylist':
        if (!args.list) {
          error = 'Unkown List'
          break
        }
        rt = await func.loadPlaylist(ui, device, args.list)
        break
      case 'loadtrack':
        if (!args.track) {
          error = 'Unkown Track'
          break
        }
        if (!args.list) {
          error = 'Unkown List'
          break
        }
        rt = await func.loadTrack(ui, device, args.track, args.list)
        break
      case 'setshuffle':
        rt = await func.setShuffle(ui, device, args.value)
        break
      case 'toggleshuffle':
        rt = await func.toggleShuffle(ui, device)
        break
      case 'setplaymode':
        if (!args.mode) {
          error = 'Unkown Mode'
          break
        }
        rt = await func.setPlayMode(ui, device, args.mode)
        break
      case 'setmanual':
        rt = await func.setManual(ui, device)
        break
      case 'setauto':
        rt = await func.setAuto(ui, device)
        break

      case 'getstate':
        rt = await func.state$(ui, device)
        break

      case 'getplaylist':
        rt = await func.playlist$(ui, device)
        break
      case 'gettrack':
        rt = await func.track$(ui, device)
        break
      case 'getlength':
        rt = await func.length$(ui, device)
        break
      case 'getelapsedtime':
        rt = await func.elapsedTime$(ui, device)
        break
      case 'getremainingtime':
        rt = await func.remainingTime$(ui, device)
        break
      case 'getshuffle':
        rt = await func.shuffle$(ui, device)
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

export default player
