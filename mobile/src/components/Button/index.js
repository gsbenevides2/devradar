import React from 'react'
import {
 TouchableOpacity,
 StyleSheet
} from 'react-native'

const styleDefault ={
 backgroundColor:"#7D40E7",
 padding:10,
 borderRadius:10
}

export default (props)=>{
 if(props.style){
	style = StyleSheet.compose(styleDefault,props.style)
 }
 else style = styleDefault

 return <TouchableOpacity {...props} style={style}>{props.children}</TouchableOpacity>
}
