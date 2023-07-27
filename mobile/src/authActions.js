import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
 setToken(token){
	AsyncStorage.setItem("token",token)
	return {
	 type: 'SET_TOKEN', 
	 payload: token 
	}
 },
 setUserData(userData){
	AsyncStorage.setItem("userData",JSON.stringify(userData))
	return {
	 type:'SET_USERDATA',
	 payload:userData
	}
 },
}
