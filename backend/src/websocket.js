const socketIo = require("socket.io")

const auth = require("./auth")

const parseStringAsArray = require("./utils/parseStringAsArray")
const calculateDistance = require("./utils/calculateDistance")

const connectionsToNewDevs = []

let io
exports.setupWebSocket = server=>{
 io = socketIo(server)
 io.on('connection',socket=>{

	socket.on("subscribeToNewDevs",devSearch=>{
	 const {latitude,longitude,techs} =devSearch
	 connectionsToNewDevs.map((connection,index)=>{
		if(connection.id === socket.id){
		 connectionsToNewDevs.splice(index, 1);
		}
	 })

	 connectionsToNewDevs.push({
		id:socket.id,
		techs:parseStringAsArray(techs),
		coordinates:{
		 latitude,longitude
		}
	 })

	})
	socket.on("subscribeToAutenticate",()=>{
	 socket.emit("receiveUrl",auth.redirect(socket.id))
	})
	socket.on("disconnect",()=>{
	 connectionsToNewDevs.map((connection,index)=>{
		if(connection.id === socket.id){
		 connectionsToNewDevs.splice(index, 1);
		}
	 })
	})
 })
}


exports.findConnections =(coordinates,techs)=>{
 return connectionsToNewDevs.filter(connection=>{
	return calculateDistance(coordinates,connection.coordinates) < 10
	 && connection.techs.some(tech=>techs.includes(tech))
 })
}
exports.sendMessage = (to,message,data)=>{
 to.map(connection=>{
	io.to(connection.id).emit(message,data)
 })
}
