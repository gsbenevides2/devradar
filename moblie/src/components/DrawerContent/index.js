import React from 'react'
import {
 ScrollView,
 StyleSheet,
 Text,
 View,
 Image
} from 'react-native'

import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems } from 'react-navigation-drawer';
import {connect} from 'react-redux'

const Logo = require('../../../assets/logo.png')

function Drawer(props){

 return(
	<ScrollView>
	 <SafeAreaView
	 style={styles.container}
	 forceInset={{ top: 'always', horizontal: 'never' }}
	>
		<View style={styles.logoContainer}>
		 <Image
		 source={Logo}
		 style={styles.logo}
		/>
			<Text style={styles.logoText}>DevRadar</Text>
			{props.accessToken &&
			 <Text>{props.userData.name}</Text>
			}
		</View>
		<DrawerItems {...props} />
	 </SafeAreaView>
	</ScrollView>
 )
}

const styles = StyleSheet.create({
 container: {
	flex: 1,
 },
 logoContainer:{
	alignItems:'center'
 },
 logo:{
	height:180,
	width:180
 },
 logoText:{
	fontWeight:'bold',
	fontSize:20
 }
});
export default connect(({accessToken,userData})=>({accessToken,userData}))(Drawer)
