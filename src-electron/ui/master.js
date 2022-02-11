function checkNumber(value) {
  if (value >= 0 && value <= 1) {
    return true
  } else {
    return false
  }
}

function checkDB(value) {
  if (value <= 10) {
    return true
  } else {
    false
  }
}

function checkTime(value) {
  if (value > 0) {
    return value
  } else {
    return 0
  }
}

function checkValue(value) {
  if (value == 1) {
    return 1
  } else {
    return 0
  }
}

function master(ui, args) {
  try {
    console.log(ui, args)
    if (!args.command) {
      return 'Command Error'
    }

    if (args.channeltype) {
      // channel function
    } else {
      const command = args.command.toLowerCase()

      // set master fader
      if (command === 'setfaderlevel') {
        if (checkNumber(args.value)) {
          ui.master.setFaderLevel(args.value)
          return 'OK'
        } else {
          return 'Value Error'
        }
      }

      if (command === 'setfaderleveldb') {
        if (args.value <= 10) {
          ui.master.setFaderLevelDB(args.value)
          return 'OK'
        } else {
          return 'Value Error'
        }
      }

      if (command === 'changefaderleveldb') {
        if (args.value <= 0) {
          ui.master.changeFaderLevelDB(args.value)
          return 'OK'
        } else {
          return 'Value Error'
        }
      }

      if (command === 'fadeto') {
        let time = 0
        if (args.time && args.time > 0) {
          time = args.time
        }
        if (args.value >= 0 && args.value <= 1) {
          ui.master.fadeTo(args.value, time)
          return 'OK'
        } else {
          return 'Value Error'
        }
      }

      if (command === 'fadetodb') {
        if (checkDB(args.value)) {
          ui.master.fadeToDB(args.value, checkTime(args.time))
          return 'OK'
        } else {
          return 'Value Error'
        }
      }

      // panorama
      if (command === 'pan') {
        if (args.value >= 0 && args.value <= 1) {
          ui.master.pan(args.value)
          return 'OK'
        } else {
          return 'Value Error'
        }
      }

      // dim
      if (command === 'dim') {
        ui.master.dim()
      }
      if (command === 'undim') {
        ui.master.undim()
      }
      if (command === 'toggledim') {
        ui.master.toggleDim()
      }
      if (command === 'setdim') {
        ui.master.setDim(checkValue(args.value))
      }

      // get
      if (command === 'getfaderlevel') {
        ui.master.faderLevel$.subscribe((value) => {
          return value
        })
      }

      if (command === 'getfaderleveldb') {
        ui.master.faderLevelDB$.subscribe((value) => {
          return value
        })
      }

      if (command === 'getpan') {
        ui.master.pan$.subscribe((value) => {
          return value
        })
      }

      if (command === 'getdim') {
        ui.master.dim$.subscribe((value) => {
          return value
        })
      }

      return 'Unknown Command'
    }
  } catch (e) {
    console.error(e)
  }
}

export default master
