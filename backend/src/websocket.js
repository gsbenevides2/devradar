const socketIo = require("socket.io")
const parseStringAsArray = require("./utils/parseStringAsArray")
const calculateDistance = require("./utils/calculateDistance")
const connections = []
let io 
exports.setupWebSocket = server=>{
 io = socketIo(server)
 io.on("connection",socket=>{
	const {latitude,longitude,techs} =socket.handshake.query

	connections.push({
	 id:socket.id,
	 techs:parseStringAsArray(techs),
	 coordinates:{
		latitude,longitude
	 }
	})
 })
}
exports.findConnections =(coordinates,techs)=>{
 return connections.filter(connection=>{
	return calculateDistance(coordinates,connection.coordinates) < 10
	 && connection.techs.some(tech=>techs.includes(tech))
 })
}
exports.sendMessage = (to,message,data)=>{
 to.map(connection=>{
	io.to(connection.id).emit(message,data)
 })
}
