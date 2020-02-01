import React from 'react'
import {View,StyleSheet} from 'react-native'

export default (props)=>(
 <View
 style={
	StyleSheet.compose({
    borderBottomColor: 'black',
		borderBottomWidth: 1,
	},props.style)}
/>
)
