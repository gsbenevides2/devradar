import socketIo from 'socket.io-client'

const socket = socketIo("http://localhost:3333",{
 autoConnect:false
})

function subscribeToNewDevs(searchData){
 socket.emit("subscribeToNewDevs",searchData)
}

function receiveDevs(subscribeFunction){
 socket.on("new-dev",subscribeFunction)
}

function connect(latitude,longitude,techs){
 socket.connect()
}

function autenticate(){
 let popup 
 return new Promise(resolve=>{
	socket.emit("subscribeToAutenticate")
	socket.on("receiveUrl",url=>{
	 popup = window.open(url)
	})
	socket.on("receiveToken",token=>{
	 popup.close()
	 console.log(token)
	 resolve(token)
	})
 })
}
function disconnect(){
 if(socket.connected){
	socket.disconnect()
 }
}
export {
 connect,
 disconnect,
 autenticate,
 receiveDevs,
 subscribeToNewDevs
}
