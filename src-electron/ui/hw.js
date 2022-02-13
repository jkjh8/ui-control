import func from './functions'

async function hardware(ui, device, args) {
  try {
    let error
    let rt

    const command = args.command.toLowerCase()
    switch (command) {
      case 'phantomon':
        rt = await func.phantomOn(ui, device)
        break
      case 'phantomoff':
        rt = await func.phantomOff(ui, device)
        break
      case 'togglephantom':
        rt = await func.togglePhantom(ui, device)
        break
      case 'setphantom':
        rt = await func.setPhantom(ui, device, args.value)
        break
      case 'getphantom':
        rt = await func.getPhantom(ui, device)
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

export default hardware
