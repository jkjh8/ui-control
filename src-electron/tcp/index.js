import { BrowserWindow } from 'electron'
import net from 'net'
import db from '../db'

let server
const clients = []

function createServer(port) {
  console.log(port)
  try {
    server = net.createServer((socket) => {
      console.log(socket.address().address + ' connected!!!')
      socket.setEncoding('utf8')
    })

    server.on('error', (err) => {
      console.log('server error ', err)
    })

    server.on('connection', (socket) => {
      clients.push(socket)
      console.log('client connect', clients.length)

      socket.on('close', () => {
        clients.splice(clients.indexOf(socket), 1)
        console.log('client disconnted.')
      })

      socket.on('data', (data) => {
        write(socket, 'ok ' + data)
      })
    })

    server.listen(port, '0.0.0.0', async () => {
      console.log('server listening ' + port)
      db.setup.update(
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
    console.error(e)
  }
}

function distoryServer() {
  for (let i in clients) {
    clients[i].distory()
  }
  server.close(() => {
    console.log('server closed')
    server.unref()
    db.setup.update({ section: 'server' }, { $set: { status: false } })
    BrowserWindow.fromId(1).webContents.send('onResponse', {
      section: 'server',
      status: false
    })
  })
}

function write(socket, data) {
  socket.write(data)
}

export { createServer, distoryServer }
