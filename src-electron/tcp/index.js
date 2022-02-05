import net from 'net'

let server
const client = []

function createServer(port) {
  console.log(port)
  try {
    server = net.createServer((socket) => {
      console.log(socket.address().address + ' connected!!!')
      socket.setEncoding('utf8')

      socket.on('data', (data) => {
        console.log(data, socket.remoteAddress, socket.remotePort)
        write(socket, 'ok' + data)
      })

      socket.on('close', function () {
        console.log('client disconnted.')
      })
    })

    server.on('error', (err) => {
      console.log('server error ', err)
    })

    server.listen(port, '0.0.0.0', () => {
      console.log('server listening ' + port)
    })
  } catch (e) {
    console.error(e)
  }
}

function distoryServer() {
  server.close()
  server.unref()
}

function write(socket, data) {
  socket.write(data)
}

export { createServer, distoryServer }
