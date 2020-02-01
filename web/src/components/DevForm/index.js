import React, {useState,useEffect} from "react"

export default function DevForm(props){
 const {onSubmit} = props
 const [latitude, setLatitude] = useState("")
 const [longitude,setLongitude] = useState("")
 const [techs,setTechs] = useState("")
 useEffect(()=>{
	navigator.geolocation
	 .getCurrentPosition(position=>{
		const {latitude,longitude} = position.coords
		setLatitude(latitude)
		setLongitude(longitude)
	 },
		err=>console.error,{
		 timeout:30000
		})
 },[])
 async function handleSubmit(e){
	e.preventDefault()
	await onSubmit({
	 longitude,
	 latitude,
	 techs
	})
	setTechs("")
 }
 return(
	<form onSubmit={handleSubmit}>
	 <div className="input-block">
		<label htmlFor="techs">Tecnologias</label>
		<input name="techs" id="techs" onChange={e=>setTechs(e.target.value)} required/>
	 </div>
	 <div className="input-group">
		<div className="input-block">
		 <label htmlFor="latitude">Latitude</label>
		 <input name="latitude" onChange={e=>setLatitude(e.target.value)} type="number" value={latitude} id="latitude" required/>
		</div>
		<div className="input-block">
		 <label htmlFor="longitude">Latitude</label>
		 <input name="longitude" onChange={e=>setLongitude(e.target.value)} type="number"  value={longitude} id="longitude" required/>
		</div>
	 </div>
	 <button type="submit">Salvar</button>
	</form>

 )
}
