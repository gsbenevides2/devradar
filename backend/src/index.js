const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes.js')
const cors = require("cors")
mongoose.connect(
'mongodb://gsbenevides2:barrissa1@cluster0-shard-00-00-grlln.gcp.mongodb.net:27017,cluster0-shard-00-01-grlln.gcp.mongodb.net:27017,cluster0-shard-00-02-grlln.gcp.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
 useCreateIndex: true,
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)
