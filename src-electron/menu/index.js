import { app, Menu, Tray, nativeImage, BrowserWindow, dialog } from 'electron'
import path from 'path'
import db from '../db'

const img_path = process.env.DEV ? 'public/menu' : process.resourcesPath

const img_show = nativeImage.createFromPath(path.join(img_path, 'max.png'))
const img_hide = nativeImage.createFromPath(path.join(img_path, 'min.png'))
const img_close = nativeImage.createFromPath(path.join(img_path, 'close.png'))
const img_info = nativeImage.createFromPath(path.join(img_path, 'info.png'))
const img_logo = nativeImage.createFromPath(path.join(img_path, 'logo.png'))

let mainMenu
let trayMenu
let tray
let bootOn = false
let startTray = false

async function createMainMenu(bos, swti) {
  bootOn = bos
  startTray = swti
  const isMac = process.platform === 'darwin'
  mainMenu = Menu.buildFromTemplate([
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' }
            ]
          }
        ]
      : []),
    {
      label: 'File',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        {
          label: 'Boot On Start',
          type: 'checkbox',
          id: 'bootOnStart',
          checked: bootOn,
          click: async () => {
            bootOn = !bootOn
            app.setLoginItemSettings({
              openAtLoad: bootOn,
              path: app.getPath('exe')
            })
            await db.setup.update(
              { section: 'bootonstart' },
              { $set: { value: bootOn } },
              { upsert: true }
            )
            changeMenuState()
          }
        },
        {
          label: 'Start With TrayIcon',
          type: 'checkbox',
          id: 'startWithTrayIcon',
          checked: startTray,
          click: async () => {
            startTray = !startTray
            await db.setup.update(
              { section: 'startwithtrayicon' },
              { $set: { value: startTray } },
              { upsert: true }
            )
            changeMenuState()
          }
        },
        {
          label: 'show dialog',
          type: 'normal',
          click: () => {
            dialog
              .showMessageBox({
                message: '123',
                buttons: ['cancel', 'ok']
              })
              .then((r) => {
                console.log(r)
              })
          }
        },
        { type: 'separator' },
        isMac
          ? {
              label: 'close',
              icon: img_close.resize({ width: 16, height: 16 }),
              accelerator: 'alt+F4'
            }
          : {
              label: 'Exit',
              icon: img_close.resize({ width: 16, height: 16 }),
              accelerator: 'alt+F4',
              click: () => {
                app.exit(0)
              }
            }
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }]
              }
            ]
          : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
      ]
    },
    // { role: 'viewMenu' }
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        ...(isMac
          ? [
              { type: 'separator' },
              { role: 'front' },
              { type: 'separator' },
              { role: 'window' }
            ]
          : [
              {
                role: 'close',
                icon: img_hide.resize({ width: 16, height: 16 })
              }
            ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://electronjs.org')
          }
        },
        {
          label: 'Help',
          type: 'normal',
          accelerator: 'F1',
          click: () => {
            BrowserWindow.fromId(1).webContents.send('onResponse', {
              command: 'help'
            })
          }
        }
      ]
    }
  ])

  Menu.setApplicationMenu(mainMenu)
}

function createTrayMenu() {
  trayMenu = Menu.buildFromTemplate([
    {
      label: 'Hide & Show',
      type: 'normal',
      icon: img_hide.resize({ width: 16, height: 16 }),
      // accelerator: 'CommandOrControl+H',
      click: () => {
        hideNShow()
      }
    },
    { type: 'separator' },
    {
      label: 'Exit',
      type: 'normal',
      icon: img_close.resize({ width: 16, height: 16 }),
      // accelerator: 'alt+F4',
      click: () => {
        app.exit(0)
      }
    }
  ])

  tray = new Tray(img_logo.resize({ width: 16, height: 16 }))
  tray.setToolTip('UI Control')
  tray.setContextMenu(trayMenu)

  tray.on('click', () => {
    hideNShow()
  })
}

function hideNShow() {
  if (BrowserWindow.fromId(1).isVisible()) {
    BrowserWindow.fromId(1).hide()
  } else {
    BrowserWindow.fromId(1).show()
  }
}

function changeMenuState() {
  mainMenu.getMenuItemById('bootOnStart').checked = bootOn
  mainMenu.getMenuItemById('startWithTrayIcon').checked = startTray
}

export { createMainMenu, createTrayMenu }
