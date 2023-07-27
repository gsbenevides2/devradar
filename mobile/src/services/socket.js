import socketIo from 'socket.io-client'

class Socket {
	static instance = null
	static async getInstance() {
		if (Socket.instance === null) {
			Socket.instance = await Socket.connect()
		}
		return Socket.instance
	}

	socker = null
	constructor(socket) {
		this.socket = socket
	}

	static async connect() {
		return new Promise((resolve, reject) => {
			const socketUrl = "https://google.gui.dev.br:3103"
			console.log("WebSocket connecting to:", socketUrl)
			const socket = socketIo(socketUrl)
			socket.on("connect", () => {
				console.log("WebSocket connected, id:", socket.id)
				resolve(new Socket(socket))
			})
		})
	}

	subscribeToNewDevs(searchData) {
		this.socket.emit("subscribeToNewDevs", searchData)
	}

	receiveDevs(subscribeFunction) {
		this.socket.on("new-dev", subscribeFunction)
	}

	getAuthUrl() {
		return new Promise((resolve, reject) => {
			this.socket.on("receiveUrl", url => {
				resolve(url)
			})
			this.socket.emit("subscribeToAutenticate")
		})
	}

	listenToToken() {
		return new Promise((resolve, reject) => {
			this.socket.on("receiveToken", token => {
				resolve(token)
			})
		})
	}

	disconnect() {
		this.socket.disconnect()
		Socket.instance = null
	}
}

export default Socket

