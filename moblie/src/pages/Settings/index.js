import React ,{useState} from 'react'
import {
 View,
 Text,
 Image,
 StyleSheet,
 BackHandler,
 AsyncStorage,
 Alert
} from 'react-native'

import {showMessage} from 'react-native-flash-message'
import { NavigationActions ,StackActions} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

import {connect} from 'react-redux'
import authActions from '../../authActions'

import { 
 requestPermissionsAsync,
 getCurrentPositionAsync 
} from 'expo-location'

import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import api from '../../services/api'

function Settings({accessToken,userData,dispatch,navigation}){
 const [techs,setTechs] = useState(userData.techs.join(", "))
 function updateTechs(){
	api.put("/dev",{
	 github_username:userData.github_username,
	 accessToken,
	 techs,
	 latitude:userData.location.coordinates[1],
	 longitude:userData.location.coordinates[0]
	})
	 .then(({data})=>{
		dispatch(authActions.setUserData(data))
		showMessage({
		 message:'Atualizado com sucesso',
		 type:'success'
		})
	 })
	 .catch()
 }
 function syncGithub(){
	api.put("/dev",{
	 github_username:userData.github_username,
	 accessToken,
	 techs:userData.techs.join(", "),
	 latitude:userData.location.coordinates[1],
	 longitude:userData.location.coordinates[0]
	})
	 .then(({data})=>{
		dispatch(authActions.setUserData(data))
		showMessage({
		 message:'Atualizado com sucesso',
		 type:'success'
		})
	 })
	 .catch()
 }
 function logout(){

		AsyncStorage.clear(()=>{
		 showMessage({
			message:'Bye, volte sempre.',
			type:'success'
		 })
		 setTimeout(()=>{
			const resetAction = StackActions.reset({
			 index: 0,
			 actions: [
				NavigationActions.navigate({routeName:'LogoutSuccess'}),
			 ],
			});
			navigation
			 .dangerouslyGetParent()
			 .dangerouslyGetParent()
			 .dispatch(resetAction)
			BackHandler.exitApp()
		 },1505)
		})
 }
 function deleteAccount(){
	api.delete("/dev",{
	 data:{
		github_username:userData.github_username,
		accessToken
	 }
	})
	 .then(logout)
	 .catch(({response})=>{console.log(response)})
 }
 function updateCoordinates(){
	async function yesFunction(){
	 const { granted } = await requestPermissionsAsync()

	 if (granted) {
		const { coords } = await getCurrentPositionAsync({
		 enableHighAccuracy: true
		})
		const { latitude, longitude } = coords
		api.put("/dev",{
		 github_username:userData.github_username,
		 accessToken,
		 techs:userData.techs.join(", "),
		 latitude,
		 longitude
		})
		 .then(({data})=>{
			dispatch(authActions.setUserData(data))
			showMessage({
			 message:'Atualizado com sucesso',
			 type:'success'
			})
		 })
	 }
	}

	Alert.alert(
	 'Atualizar coordenadas?',
	 'Você deseja atualizar suas coordenadas para sua posição atual?',
	 [
		{
		 text:'Não'
		},
		{
		 text:'Sim',
		 onPress:yesFunction
		}
	 ]
	)
 }
 return (
	<View style={styles.container}>
	 <View style={styles.block1}>
		<Image style={styles.userPhoto} source={{uri:userData.avatar_url}}/>
		<View style={styles.block12}>
		 <Text>{userData.name}</Text>
		 <Text style={styles.github_username}>{`@${userData.github_username}`}</Text>
		 <Button onPress={syncGithub} style={styles.button}><Text style={styles.buttonText}>Sincronizar com GitHub</Text></Button>
		</View>
	 </View>
	 <TextInput
	 style={{width:"100%",flex:0,marginTop:10}}
	 placeholder="Quais são suas techs?"
	 value={techs}
	 onChangeText={setTechs}
	/>
		<Button onPress={updateTechs} style={styles.button}><Text style={styles.buttonText}>Atualizar techs</Text></Button>
		<Button onPress={updateCoordinates} style={styles.button}><Text style={styles.buttonText}>Atualizar coordenadas(localização)</Text></Button>
		<Button onPress={logout} style={styles.button}><Text style={styles.buttonText}>Sair</Text></Button>
		<Button onPress={deleteAccount} style={styles.buttonDelete}><Text style={styles.buttonText}>Deletar Conta</Text></Button>
	 </View>
 )
}
const styles = StyleSheet.create({
 container:{
	paddingLeft:20,
	paddingRight:20
 },
 block1:{
	flexDirection:'row',
	paddingTop:10,
 },
 block12:{
	paddingLeft:20,
	paddingTop:10
 },
 github_username:{
	color:"#9E9E9E"
 },
 userPhoto:{
	height:100,
	width:100,
	borderRadius:50
 },
 button:{
	marginTop:5
 },
 buttonDelete:{
	marginTop:5,
	backgroundColor:"#E53935"
 },
 button:{
	marginTop:5
 },
 buttonText:{
	color:"#fff",
	textAlign:'center'
 }
})
export default connect(({accessToken,userData})=>({accessToken,userData}))(Settings)
