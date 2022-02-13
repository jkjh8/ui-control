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

function checkBoolean(value) {
  if (value == 1) {
    return 1
  } else {
    return 0
  }
}

function setFaderLevel(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkNumber(value)) {
      try {
        ui.setFaderLevel(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function setFaderLevelDB(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkDB(value)) {
      try {
        ui.setFaderLevelDB(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function changeFaderLevelDB(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkDB(value)) {
      try {
        ui.changeFaderLevelDB(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function fadeTo(ui, device, value, time) {
  return new Promise((resolve, reject) => {
    if (time && time > 0 && checkNumber(value)) {
      try {
        ui.fadeTo(value, time)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function fadeToDB(ui, device, value, time) {
  return new Promise((resolve, reject) => {
    if (time && time > 0 && checkDB(value)) {
      try {
        ui.fadeToDB(value, time)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function setMute(ui, device, value) {
  return new Promise((resolve, reject) => {
    const mutevalue = checkBoolean(value)
    try {
      ui.setMute(mutevalue)
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
  })
}

function mute(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.mute()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function unmute(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.unmute()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
  })
}

function toggleMute(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkBoolean(value)) {
      try {
        ui.toggleMute(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function pan(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkNumber(value)) {
      try {
        ui.pan(value)
      } catch (e) {
        console.error(r)
        reject('Device command error')
      }
    } else {
      reject('Invaild Value')
    }
  })
}

function setSolo(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkBoolean(value)) {
      try {
        ui.setSolo(value)
      } catch (e) {
        console.error(r)
        reject('Device command error')
      }
    }
  })
}

function solo(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.solo()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function unsolo(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.unsolo()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
  })
}

function toggleSolo(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkBoolean(value)) {
      try {
        ui.toggleSolo(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function pre(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.pre()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function post(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.post()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function togglePost(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkBoolean(value)) {
      try {
        ui.togglePost(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function setPost(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkBoolean(value)) {
      try {
        ui.setPost(value)
      } catch (e) {
        console.error(r)
        reject('Device command error')
      }
    }
  })
}

function preProc(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.preProc()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function postProc(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.postProc()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function setPostProc(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkBoolean(value)) {
      try {
        ui.setPostProc(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function phantomOn(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.phantomOn()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function phantomOff(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.phantomOff()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function setPhantom(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkBoolean(value)) {
      try {
        ui.setPhantom(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function togglePhantom(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkBoolean(value)) {
      try {
        ui.togglePhantom(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function toggle(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkBoolean(value)) {
      try {
        ui.toggle(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function play(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.play()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function stop(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.stop()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function pause(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.pause()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function next(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.next()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function prev(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.prev()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function loadPlaylist(ui, device, list) {
  return new Promise((resolve, reject) => {
    try {
      ui.loadPlaylist(list)
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function loadTrack(ui, device, track, list) {
  return new Promise((resolve, reject) => {
    try {
      ui.loadTrack(track, list)
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function setShuffle(ui, device, value) {
  return new Promise((resolve, reject) => {
    if (checkBoolean(value)) {
      try {
        ui.setShuffle(value)
        resolve('OK')
      } catch (e) {
        console.error(e)
        reject('Device command error')
      }
    } else {
      reject('Invalid Value')
    }
  })
}

function toggleShuffle(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.toggleShuffle()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function setPlayMode(ui, device, value) {
  return new Promise((resolve, reject) => {
    try {
      const mode = value.toLowerCase()
      if (mode === 'auto') {
        ui.setPlayMode('auto')
        resolve('OK - auto')
      } else {
        ui.setPlayMode('manual')
        resolve('OK - manual')
      }
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function setManual(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.setManual()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function setAuto(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.setAuto()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function recordToggle(ui, device) {
  return new Promise((resolve, reject) => {
    try {
      ui.recordToggle()
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function loadShow(ui, device, show) {
  return new Promise((resolve, reject) => {
    try {
      ui.loadShow(show)
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function loadSnapshot(ui, device, show, snapshot) {
  return new Promise((resolve, reject) => {
    try {
      ui.loadSnapshot(show, snapshot)
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

function loadCue(ui, device, show, cue) {
  return new Promise((resolve, reject) => {
    try {
      ui.loadCue(show, cue)
      resolve('OK')
    } catch (e) {
      console.error(e)
      reject('Device command error')
    }
    resolve('OK')
  })
}

// subscribe ---------------------------------------------------------------------
function faderLevel$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.faderLevel$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function faderLevelDB$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.faderLevelDB$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function mute$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.mute$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function solo$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.solo$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function pan$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.pan$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function post$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.post$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function phantom$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.phantom$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function state$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.state$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function playlist$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.playlist$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function track$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.track$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function length$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.length$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function elapsedTime$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.elapsedTime$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function remainingTime$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.remainingTime$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function shuffle$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.shuffle$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function recording$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.recording$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

function busy$(ui, device) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Device not response')
    }, 5000)

    try {
      ui.busy$.subscribe((value) => {
        resolve(String(value))
      })
    } catch (e) {
      console.error(r)
      reject('Device command error')
    }
  })
}

export default {
  setFaderLevel,
  setFaderLevelDB,
  changeFaderLevelDB,
  fadeTo,
  fadeToDB,
  setMute,
  mute,
  unmute,
  toggleMute,
  pan,
  setSolo,
  solo,
  unsolo,
  toggleSolo,
  pre,
  post,
  togglePost,
  setPost,
  preProc,
  postProc,
  setPostProc,
  phantomOn,
  phantomOff,
  togglePhantom,
  setPhantom,
  toggle,
  play,
  stop,
  pause,
  next,
  prev,
  loadPlaylist,
  loadTrack,
  setShuffle,
  toggleShuffle,
  setPlayMode,
  setManual,
  setAuto,
  recordToggle,
  loadShow,
  loadSnapshot,
  loadCue,

  // subscribe
  faderLevel$,
  faderLevelDB$,
  mute$,
  solo$,
  pan$,
  post$,
  phantom$,
  state$,
  playlist$,
  track$,
  length$,
  elapsedTime$,
  remainingTime$,
  shuffle$,
  recording$,
  busy$
}
