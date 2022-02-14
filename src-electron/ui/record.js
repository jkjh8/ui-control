import func from './functions'

async function recorder(ui, device, args) {
  try {
    let error
    let rt

    const command = args.command.toLowerCase()
    switch (command) {
      case 'recordtoggle':
        rt = await func.recordToggle(ui, device)
        break
      case 'getbusy':
        rt = await func.busy$(ui, device)
        break
      case 'getstate':
        rt = await func.recording$(ui, device)
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

export default recorder
