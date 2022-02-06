import { dialog, nativeImage, BrowserWindow } from 'electron'
import path from 'path'

const img_path = process.env.DEV ? 'public/menu' : process.resourcesPath

const img_show = nativeImage.createFromPath(path.join(img_path, 'max.png'))
const img_hide = nativeImage.createFromPath(path.join(img_path, 'min.png'))
const img_close = nativeImage.createFromPath(path.join(img_path, 'close.png'))
const img_info = nativeImage.createFromPath(path.join(img_path, 'info.png'))
const img_logo = nativeImage.createFromPath(path.join(img_path, 'logo.png'))

function errorDialog(message) {
  dialog.showMessageBox(BrowserWindow.fromId(1), {
    message: String(message),
    type: 'error',
    title: 'UI Control Error'
  })
}

export { errorDialog }
