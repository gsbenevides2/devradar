import socketIo from 'socket.io-client'
import * as WebBrowser from 'expo-web-browser';

import {AsyncStorage} from 'react-native'

let urlReceived

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
function tryUrlAgain(){
	 WebBrowser.openBrowserAsync(urlReceived)
}
function autenticate(){
 return new Promise(resolve=>{
	socket.emit("subscribeToAutenticate")
	socket.on("receiveUrl",url=>{
	 urlReceived = url
	 WebBrowser.openBrowserAsync(url)
	})
	socket.on("receiveToken",token=>{
	 AsyncStorage.setItem("AcessToken",token)
	 resolve(token)
	})
 })
}
function disconnect(){
 if(socket.connected){
	socket.disconnect()
 }
}
export default {
 connect,
 disconnect,
 autenticate,
 receiveDevs,
 tryUrlAgain,
 subscribeToNewDevs
}
