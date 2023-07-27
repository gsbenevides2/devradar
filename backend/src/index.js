const http = require("http")
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes.js')
const cors = require("cors")
const { setupWebSocket } = require("./websocket")
require("dotenv").config()


const host = process.env.DBHOST 
const user = process.env.DBUSER
const password = process.env.DBPASSWORD
const port = process.env.DBPORT
const url = `mongodb://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`
console.log(url)

mongoose.connect(
    url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const app = express()
const server = http.Server(app)
app.use(cors())
app.use(express.json())
app.use(routes)
setupWebSocket(server)
server.listen(process.env.PORT || 3333, () => console.log("OK"))
