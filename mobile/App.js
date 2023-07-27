import React from 'react';
import { StatusBar,LogBox } from 'react-native'
 
import { Provider } from 'react-redux'
import store from './src/store'
import FlashMessage from 'react-native-flash-message'
import Routes from './src/routes'

LogBox.ignoreLogs([
 "Unrecognized WebSocket"
])
export default function App() {
 return (
	<Provider store={store}>
	 <StatusBar barStyle='light-content' backgroundColor="#7D40E7" />
	 <Routes />
	 <FlashMessage/>
	</Provider>
 );
}
