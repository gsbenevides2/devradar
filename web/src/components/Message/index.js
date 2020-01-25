import React from 'react'
import './styles.css'
export default function Message(props){
 const msg = props.msg
 return <div className={msg? 'message show' : 'message'}>{msg}</div>
}
