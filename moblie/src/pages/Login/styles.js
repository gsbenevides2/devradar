import {StyleSheet} from 'react-native'

export default StyleSheet.create({
 container:{
	flex:1,
	alignItems:"center",
	justifyContent:'center'	
 },
 logo:{
	height:200,
	width:200,
	marginBottom:40
 },
 inputPrinc:{
	flex:0,
	width:"90%",
	borderWidth:1,
	marginBottom:10
 },
 containerSec:{
	width:"90%",
	flexDirection:'row',
	justifyContent: 'space-between',
 },
 inputSec:{
	flex:0,
	width:"49%",
	borderWidth:1
 },
 signInButton:{
	width:"90%",
	marginTop:5,
	marginBottom:200,
 },
 signInText:{
	color:"#fff",
	fontSize:25,
	fontWeight:"bold",
	textAlign:"center"
 }
})
