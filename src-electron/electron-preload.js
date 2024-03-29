/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('FN', {
  onRequest: (args) => {
    ipcRenderer.send('onRequest', { ...args })
  },
  onResponse: (fn) => {
    ipcRenderer.on('onResponse', (event, ...args) => {
      fn(...args)
    })
  },
  replay: (fn) => {
    ipcRenderer.on('replay', (event, ...args) => {
      fn(...args)
    })
  },
  checkId: async (id) => {
    return await ipcRenderer.invoke('checkId', id)
  },
  checkIp: async (ip) => {
    return await ipcRenderer.invoke('checkIp', ip)
  },
  checkServer: async () => {
    return await ipcRenderer.invoke('checkServer')
  }
})
