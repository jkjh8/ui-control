import { app, Menu, Tray, nativeImage, BrowserWindow } from 'electron'
import path from 'path'

const img_path = process.env.DEV ? 'public/menu' : process.resourcesPath

const img_show = nativeImage.createFromPath(path.join(img_path, 'max.png'))
const img_hide = nativeImage.createFromPath(path.join(img_path, 'min.png'))
const img_close = nativeImage.createFromPath(path.join(img_path, 'close.png'))
const img_info = nativeImage.createFromPath(path.join(img_path, 'info.png'))
const img_logo = nativeImage.createFromPath(path.join(img_path, 'logo.png'))

let trayMenu
let tray

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
}

export { createTrayMenu }
