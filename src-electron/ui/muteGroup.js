import func from './functions'

async function muteGroup(ui, device, args) {
  try {
    let error
    let rt

    const command = args.command.toLowerCase()
    switch (command) {
      case 'mute':
        rt = await func.mute(ui, device)
        break
      case 'unmute':
        rt = await func.unmute(ui, device)
        break
      case 'toggle':
        rt = await func.toggle(ui, device)
        break

      case 'getstate':
        rt = await func.state$(ui, device)
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

export default muteGroup
