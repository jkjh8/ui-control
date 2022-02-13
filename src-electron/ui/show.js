import func from './functions'

async function show(ui, device, args) {
  try {
    let error
    let rt

    const command = args.command.toLowerCase()
    switch (command) {
      case 'loadshow':
        if (!args.showname) {
          error = 'Unknown Show'
          break
        }
        rt = await func.loadShow(ui, device, args.showname)
        break
      case 'loadsnapshot':
        if (!args.snapshot) {
          error = 'Unknown Snapshot'
          break
        }
        if (!args.showname) {
          error = 'Unknown Show'
          break
        }
        rt = await func.loadSnapshot(ui, device, args.showname, args.snapshot)
        break
      case 'loadcue':
        if (!args.showname) {
          error = 'Unknown Show'
          break
        }
        if (!args.cue) {
          error = 'Unknown Cue'
          break
        }
        rt = await func.loadCue(ui, device, args.showname, args.cue)
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
