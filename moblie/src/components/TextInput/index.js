import React from 'react'

import {
 TextInput
} from 'react-native'

const styleDefault  = {
 flex: 1,
 height: 50,
 backgroundColor: '#FFF',
 color: '#333',
 borderRadius: 25,
 paddingHorizontal: 20,
 fontSize: 16,
 shadowColor: '#000',
 shadowOpacity: 0.2,
 shadowOffset: {
	width: 4,
	height: 4
 },
 elevation: 2

}
export default function Input(props){
 const style = {...styleDefault,...props.style ||{}}
 return (
	<TextInput
	style={style}
	placeholder={props.placeholder}
	placeholderTextColor={props.placeholderTextColor}
	autoCapitalize={props.autoCapitalize}
	autoCorrect={props.autoCorrect}
	value={props.value}
	onChangeText={props.onChangeText}
 />

 )
}
