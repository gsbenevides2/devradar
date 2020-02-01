import React from 'react'
import {AsyncStorage} from 'react-native'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
//

import Map from './pages/Map/Main'
import Profile from './pages/Map/Profile'

import Login from './pages/Login'
import CreateUser from './pages/Login/CreateUser'

import Settings from './pages/Settings'
import LogoutSuccess from './pages/Settings/LogoutSuccess'

import DrawerContent from './components/DrawerContent'
import DrawerButton from './components/DrawerButton' 


const MapNavigator = createStackNavigator({
 Map: {
	screen: Map,
	navigationOptions: ({navigation})=>({
	 title: 'DevRadar',
	 headerLeft: ()=><DrawerButton color="fff" navigation={navigation}/>	
	})
 },
 Profile: {
	screen: Profile,
	navigationOptions: {
	 title: 'Perfil no Github'
	}
 }
}, {
 defaultNavigationOptions: {
	headerTintColor: '#FFF',
	headerBackTitleVisible: false,
	headerStyle: {
	 backgroundColor: '#7D40E7'
	}
 }
})
const SettingsNavigator = createStackNavigator({
 Settings:{
	screen:Settings,
	navigationOptions:({navigation})=>({
	 title:"Configurações",
	 headerLeft: ()=><DrawerButton color="000" navigation={navigation}/>	
	}),
 }
})
const DrawerNavigator = createDrawerNavigator({
 MapNavigator:{
	screen:MapNavigator,
	navigationOptions:{
	 title:'Mapa'
	}
 },
 SettingsNavigator:{
	screen:SettingsNavigator,
	navigationOptions:{
	 title:'Configurações'
	}
 },
},{
 contentOptions: {
	activeTintColor:'#7D40E7',
 },
 contentComponent:DrawerContent
})

const RootNavigator = createStackNavigator({
 Login:{
	screen:Login,
	navigationOptions:{
	 headerShown: false,
	}
 },
 CreateUser:{
	screen:CreateUser,
	navigationOptions:{
	 title:"Criar Usuário"
	}
 },
 DrawerNavigator:{
	screen:DrawerNavigator,
	navigationOptions:{
	 headerShown: false,
	}
 },
 LogoutSuccess:{
	screen:LogoutSuccess,
	navigationOptions:{
	 headerShown: false,
	}
 }
})

const Routes = createAppContainer(RootNavigator)

export default Routes
