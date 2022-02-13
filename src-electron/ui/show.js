import func from './functions'

async function show(ui, device, args) {
  try {
    let error
    let rt

    const command = args.command.toLowerCase()
    switch (command) {
      case 'loadshow':
        if (!args.show) {
          error = 'Unknown Show'
          break
        }
        rt = await func.loadShow(ui, device, args.show)
        break
      case 'loadsnapshot':
        if (!args.snapshot) {
          error = 'Unknown Snapshot'
          break
        }
        if (!args.show) {
          error = 'Unknown Show'
          break
        }
        rt = await func.loadSnapshot(ui, device, args.show, args.snapshot)
        break
      case 'loadcue':
        if (!args.show) {
          error = 'Unknown Show'
          break
        }
        if (!args.cue) {
          error = 'Unknown Cue'
          break
        }
        rt = await func.loadCue(ui, device, args.show, args.cue)
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

export default show
