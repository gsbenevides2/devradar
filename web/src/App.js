import React, { useCallback, useEffect, useState } from 'react';
import api from "./services/api"
import Socket from "./services/socket"
import DevItem from "./components/DevItem"
import Message from "./components/Message"
import DevForm from "./components/DevForm"
import "./global.css"
import "./App.css"
import "./aside.css"
import "./main.css"

function App() {
	const [devs, setDevs] = useState([])
	const [msg, setMsg] = useState(null)
	useEffect(() => {
		async function loadDevs() {
			const response = await api.get("/devs")
			setDevs(response.data)
		}
		loadDevs()
	}, [])

	const handleSubmit = useCallback(async data => {
		const socket = await Socket.getInstance()
		try {
			const url = await socket.getAuthUrl()
			window.open(url, "_blank")
			const accessToken = await socket.listenToToken()
			const response = await api.post("/dev", { ...data, accessToken })

			setMsg(`Ola ${response.data.name} 🙂☺️`)
			setTimeout(() => setMsg(null), 2000)
			setDevs([...devs, response.data])
		} catch (err) { }
		finally {
			await socket.disconnect()
		}
	}, [devs])
	return (
		<div id="app">
			<Message msg={msg} />
			<aside>
				<strong>Cadastrar</strong>
				<DevForm onSubmit={handleSubmit} />
			</aside>
			<main>
				<ul>
					{devs.map(dev => (<DevItem key={dev._id} dev={dev} />))}
				</ul>
			</main>
		</div>
	);
}

export default App;
