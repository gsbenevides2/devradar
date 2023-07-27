import React from 'react'
import {
 View,
 Image,
 Text,
 StyleSheet,
} from 'react-native'

export default function LogoutSuccess(props){
 return (
	<View style={styles.container}>	
	 <Image style={styles.logo} source={require("../../../assets/logout.png")}/>
	 <Text style={styles.text}>Ops, preciso que você feche(remova da gaveta de apps recentes) e abra o app.</Text>
	</View>
 )
}
const styles = StyleSheet.create({
 container:{
	flex:1,
	alignItems:'center'
 },
 logo:{
	marginTop:100,
	width:200,
	height:200
 },
 text:{
	fontSize:15,
	marginLeft:30,
	marginRight:30,
	textAlign:'center'
 }
})
