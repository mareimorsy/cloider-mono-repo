const http = require('http')
const app = require('./app')
const config = require('./config')

const port = config.app_port;

const server = http.createServer(app);

server.listen(port)

console.log(`Server is running on http://localhost:${port}`)