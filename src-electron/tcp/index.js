import { BrowserWindow } from 'electron'
import net from 'net'
import db from '../db'
import parse from '../ui/parser'
import { errorDialog } from '../menu/dialog'

let server
const clients = []

function createServer(port) {
  console.log(port)
  try {
    server = net.createServer((socket) => {
      socket.setEncoding('utf8')
    })

    server.on('error', (err) => {
      console.log('server error ', err)
      errorDialog(err)
      distoryServer()
    })

    server.on('connection', (socket) => {
      clients.push(socket)
      console.log('client connect', clients.length)

      socket.on('close', () => {
        clients.splice(clients.indexOf(socket), 1)
        console.log('client disconnted.')
      })

      socket.on('data', async (data) => {
        console.log(data)
        try {
          const args = JSON.parse(data)
          const r = await parse(args)
          write(socket, r)
        } catch (e) {
          console.log(e)
          write(socket, 'data type error')
        }
      })
    })

    server.listen(port, '0.0.0.0', async () => {
      console.log('server listening ' + port)
      const r = await db.setup.update(
        { section: 'server' },
        { $set: { status: true, port: port } },
        { upsert: true }
      )
      BrowserWindow.fromId(1).webContents.send('onResponse', {
        section: 'server',
        status: true,
        port: port
      })
    })
  } catch (e) {
    console.error('123', e)
  }
}

function distoryServer() {
  for (let i in clients) {
    clients[i].destroy()
  }
  server.close(async () => {
    console.log('server closed')
    server.unref()
    await db.setup.update({ section: 'server' }, { $set: { status: false } })
    BrowserWindow.fromId(1).webContents.send('onResponse', {
      command: 'server',
      status: false
    })
  })
}

async function checkServer() {
  const r = await db.setup.findOne({ section: 'server' })
  BrowserWindow.fromId(1).webContents.send('onResponse', {
    command: 'server',
    status: r.value
  })
}

function write(socket, data) {
  socket.write(data)
}

export { createServer, distoryServer, checkServer }
