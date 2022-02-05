import { app, Menu, Tray, nativeImage, BrowserWindow } from 'electron'
import path from 'path'

const img_path = process.env.DEV ? 'public/menu' : process.resourcesPath

const img_show = nativeImage.createFromPath(path.join(img_path, 'max.png'))
const img_hide = nativeImage.createFromPath(path.join(img_path, 'min.png'))
const img_close = nativeImage.createFromPath(path.join(img_path, 'close.png'))
const img_info = nativeImage.createFromPath(path.join(img_path, 'info.png'))
const img_logo = nativeImage.createFromPath(path.join(img_path, 'logo.png'))

let mainMenu
let trayMenu
let tray

function createMainMenu() {
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
        isMac
          ? {
              label: 'close',
              icon: img_close.resize({ width: 16, height: 16 }),
              accelerator: 'alt+F4'
            }
          : {
              role: 'quit',
              icon: img_close.resize({ width: 16, height: 16 }),
              accelerator: 'alt+F4'
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
        }
      ]
    }
  ])

  Menu.setApplicationMenu(mainMenu)
}

function createTrayMenu() {
  trayMenu = Menu.buildFromTemplate([
    {
      label: '열기',
      type: 'normal',
      icon: img_show.resize({ width: 16, height: 16 }),
      accelerator: 'CommandOrControl+O',
      click: () => {
        BrowserWindow.fromId(1).show()
      }
    },
    {
      label: '숨기기',
      type: 'normal',
      icon: img_hide.resize({ width: 16, height: 16 }),
      accelerator: 'CommandOrControl+H',
      click: () => {
        BrowserWindow.fromId(1).hide()
      }
    },
    { type: 'separator' },
    {
      label: '종료',
      type: 'normal',
      icon: img_close.resize({ width: 16, height: 16 }),
      accelerator: 'alt+F4',
      click: () => {
        app.exit(0)
      }
    }
  ])

  tray = new Tray(img_logo.resize({ width: 16, height: 16 }))
  tray.setToolTip('UI Control')
  tray.setContextMenu(trayMenu)

  tray.on('click', () => {
    if (BrowserWindow.fromId(1).isVisible()) {
      BrowserWindow.fromId(1).hide()
    } else {
      BrowserWindow.fromId(1).show()
    }
  })
}

export { createMainMenu, createTrayMenu }
