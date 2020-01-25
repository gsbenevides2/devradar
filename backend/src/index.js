const http = require("http")
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes.js')
const cors = require("cors")
const {setupWebSocket} = require("./websocket")
require("dotenv").config()
mongoose.connect(
`mongodb://gsbenevides2:${process.env.ATLASPASSWORD}@cluster0-shard-00-00-grlln.gcp.mongodb.net:27017,cluster0-shard-00-01-grlln.gcp.mongodb.net:27017,cluster0-shard-00-02-grlln.gcp.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, {
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
server.listen(3333,()=>console.log("OK"))
