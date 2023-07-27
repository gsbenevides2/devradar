import React from "react"
import './styles.css'
export default function DevItem(props){
 const {dev} = props
 return(
	<li className="dev-item">
	 <header>
		<div className="user-c">
		<img src={dev.avatar_url} alt={`Foto de perfil de ${dev.name}`}/>
		<div className="user-info">
		 <strong>{dev.name}</strong>
		 <span>{dev.techs.join(", ")}</span>
		</div>
	 </div>
		<p>{dev.bio}</p>
		<a target="__blank" href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
	 </header>
	</li>

 )
}
