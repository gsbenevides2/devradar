import React, {useEffect,useState} from 'react';
import api from "./services/api"

import DevItem from  "./components/DevItem"
import Message from  "./components/Message"
import DevForm from  "./components/DevForm"
import "./global.css"
import "./App.css"
import "./aside.css"
import "./main.css"
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
	api.post("/devs",data)
	 .then(response=>{
		setMsg(`Ola ${response.data.name} 🙂☺️`)
		setTimeout(()=>setMsg(null),2000)
		setDevs([...devs,response.data])
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
