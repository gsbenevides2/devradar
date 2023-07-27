import React from 'react'
import { AsyncStorage } from 'react-native'

import Map from './pages/Map/Main'
import Profile from './pages/Map/Profile'

import Login from './pages/Login'
import CreateUser from './pages/Login/CreateUser'

import Settings from './pages/Settings'
import LogoutSuccess from './pages/Settings/LogoutSuccess'

import DrawerContent from './components/DrawerContent'
import DrawerButton from './components/DrawerButton'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MaterialIcons } from '@expo/vector-icons'

function MapNavigator(props) {

	const Stack = createStackNavigator()
	return (
		<Stack.Navigator screenOptions={{
			headerTintColor: '#FFF',
			headerBackTitleVisible: false,
			headerStyle: {
				backgroundColor: '#7D40E7'
			}
		}}>
			<Stack.Screen name="Map" component={Map} options={() => ({
				title: 'DevRadar',
				headerShown: true,
				headerLeft: (propsa) => <DrawerButton {...props} {...propsa} />
			})} />
			<Stack.Screen name="Profile" component={Profile} options={{ title: 'Perfil no Github' }} />
		</Stack.Navigator>
	)
}


function DrawerNavigator() {
	const Drawer = createDrawerNavigator()
	return (
		<Drawer.Navigator screenOptions={{
			drawerActiveTintColor: '#7D40E7',
			headerTintColor: '#FFF',
			headerBackTitleVisible: false,
			headerStyle: {
				backgroundColor: '#7D40E7'
			},
		}} drawerContent={props => <DrawerContent {...props} />} >
			<Drawer.Screen name="MapNavigator" component={MapNavigator} options={{ title: 'Mapa', headerShown: false, drawerIcon: ({ color, size }) => <MaterialIcons name="map" size={size} color={color} /> }} />
			<Drawer.Screen name="SettingsNavigator" component={Settings} options={{ title: 'Configurações', drawerIcon: ({ color, size }) => <MaterialIcons name="settings" size={size} color={color} /> }} />
		</Drawer.Navigator>
	)
}

function RootNavigator() {
	const Stack = createStackNavigator()
	return (
		<Stack.Navigator>
			<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
			<Stack.Screen name="CreateUser" component={CreateUser} options={{ title: "Criar Usuário" }} />
			<Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
			<Stack.Screen name="LogoutSuccess" component={LogoutSuccess} options={{ headerShown: false }} />
		</Stack.Navigator>
	)
}

export default function Routes() {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	)
}

