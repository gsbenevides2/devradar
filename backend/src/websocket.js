const socketIo = require("socket.io")

const auth = require("./auth")

const parseStringAsArray = require("./utils/parseStringAsArray")
const calculateDistance = require("./utils/calculateDistance")

const connectionsToNewDevs = []

let io
exports.setupWebSocket = server => {
	io = socketIo(server, {
		cors: {
			origin: "*",
		}
	})
	io.on('connection', socket => {
		console.log("Web Socket Connected From:", socket.id, "Total:", io.engine.clientsCount, "clients", "IP:", socket.handshake.address)

		socket.on("subscribeToNewDevs", devSearch => {
			console.log("Web Socket subscribeToNewDevs", devSearch, "From Socket:", socket.id)
			const { latitude, longitude, techs } = devSearch
			connectionsToNewDevs.map((connection, index) => {
				if (connection.id === socket.id) {
					connectionsToNewDevs.splice(index, 1);
				}
			})

			connectionsToNewDevs.push({
				id: socket.id,
				techs: parseStringAsArray(techs),
				coordinates: {
					latitude, longitude
				}
			})

		})

		socket.on("subscribeToAutenticate", () => {
			console.log("Web Socket subscribeToAutenticate", "From Socket:", socket.id)
			socket.emit("receiveUrl", auth.getAuthUrl(socket.id))
		})
		socket.on("disconnect", () => {
			for (let i = 0; i < connectionsToNewDevs.length; i++) {
				if (connectionsToNewDevs[i].id === socket.id) {
					connectionsToNewDevs.splice(i, 1)
					break
				}
			}
			console.log("Web Socket Disconnected From:", socket.id, "Total:", io.engine.clientsCount, "clients", "IP:", socket.handshake.address)
		})


	})
	io.on("disconnect", () => {
		console.log("disconnect")
	})
}


exports.findConnections = (coordinates, techs) => {
	return connectionsToNewDevs.filter(connection => {
		return calculateDistance(coordinates, connection.coordinates) < 10
			&& connection.techs.some(tech => techs.includes(tech))
	})
}
exports.sendMessage = (to, message, data) => {
	to.map(connection => {
		console.log("Web Socket sendMessage", message, "To Socket:", connection.id, "Data:", data)
		io.to(connection.id).emit(message, data)
	})
}
