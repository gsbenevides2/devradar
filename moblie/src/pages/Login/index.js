import React,{
 useState,
 useEffect
}from 'react'
import {
 View,
 Image,
 Text,
 Alert,
 StyleSheet,
 AsyncStorage
} from 'react-native'

import { NavigationActions ,StackActions} from 'react-navigation';
import { showMessage} from "react-native-flash-message";

import {connect} from 'react-redux'
import authActions from '../../authActions'

import Button from '../../components/Button'
import api from '../../services/api'
import webSocket from '../../services/socket'
import styles from './styles'

function Login(props){
 const [loading,setLoading] = useState(true)
 const {navigation,dispatch} = props
 let authProcess = false
 function login(){
	if(authProcess){
	 webSocket.tryUrlAgain()
	}
	else {
	 authProcess = true
	 webSocket.connect()
	 webSocket.autenticate().then(accessToken=>{
		api.get("/dev",{params:{accessToken}})
		 .then(response=>{
			showMessage({
			 message:'Seja bem-vindo',
			 description:`Olá novamente ${response.data.name}`,
			 type:'success'
			})
			setTimeout(()=>{
			 dispatch(authActions.setToken(accessToken))
			 dispatch(authActions.setUserData(response.data))
			},1505)
		 })
	 })
	}
 }
 function cadastrar(){

	navigation.navigate('CreateUser')
 }
 useEffect(()=>{
	if(props.userData && props.accessToken){

	 const resetAction = StackActions.reset({
		index: 0,
		actions: [
		 NavigationActions.navigate({routeName:'DrawerNavigator'}),
		],
	 });

	 navigation.dispatch(resetAction)
	}
 },[props.userData,props.accessToken])
 useEffect(()=>{
	async function load(){
	 const storageAccessToken = await AsyncStorage.getItem("token")
	 if(storageAccessToken){
		dispatch(authActions.setUserData(JSON.parse(await AsyncStorage.getItem("userData"))))
		dispatch(authActions.setToken(storageAccessToken))
	 }
	 else setLoading(false)
	}
	load()
 },[])
 if(loading){
	return <View style={{
	 backgroundColor:"#7D40E7",
	 flex:1
	}}/>
 }
 else{
	return (
	 <View
	 style={styles.container}
	 behavior="padding"
	>	
		<Image
		style={styles.logo}
		source={require("../../../assets/login.png")}
	 />
		 <Button
		 onPress={login}
		 style={StyleSheet.compose(styles.signInButton,{marginBottom:5})}
		>
			<Text style={styles.signInText}>Entrar</Text>
		 </Button>
		 <Button
		 onPress={cadastrar}
		 style={styles.signInButton}
		>
			<Text style={styles.signInText}>Cadastrar</Text>
		 </Button>

		</View>
	)
 }
}
export default connect(({accessToken,userData})=>({accessToken,userData}))(Login)
