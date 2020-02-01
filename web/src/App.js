import React, {useEffect,useState} from 'react';
import api from "./services/api"
import {connect,autenticate} from "./services/socket"
import DevItem from  "./components/DevItem"
import Message from  "./components/Message"
import DevForm from  "./components/DevForm"
import "./global.css"
import "./App.css"
import "./aside.css"
import "./main.css"
connect()
function App() {
 const [devs,setDevs] = useState([])
 const [msg,setMsg] = useState(null)
 useEffect(()=>{
	async function loadDevs(){
	 const response = await api.get("/devs")
	 setDevs(response.data)
	}
	loadDevs()
 })
 function handleSubmit(data){
	return new Promise(resolve=>{
	 autenticate()
		.then(accessToken=>{
		 api.post("/devs",{...data,accessToken})
			.then(response=>{
			 setMsg(`Ola ${response.data.name} 🙂☺️`)
			 setTimeout(()=>setMsg(null),2000)
			 setDevs([...devs,response.data])
			 resolve()
			})
		})
	})
 }
 return (
	<div id="app">
	 <Message msg={msg}/>
	 <aside>
		<strong>Cadastrar</strong>
		<DevForm onSubmit={handleSubmit}/>
	 </aside>
	 <main>
		<ul>
		 {devs.map(dev=>(<DevItem key={dev._id} dev={dev}/>))}
		</ul>
	 </main>
	</div>
 );
}

export default App;
