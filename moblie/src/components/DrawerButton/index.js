import React from 'react'
import {MaterialIcons} from '@expo/vector-icons'

export default function DrawerButton({navigation,color}){
 return (
	<MaterialIcons 
	name="menu"
	style={{
	 color:`#${color}`,
	 margin:20
	}}
	size={35} 
	onPress={()=>
		navigation.toggleDrawer()
	} />

 )
}
