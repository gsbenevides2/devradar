import React, {
	useState,
	useEffect
} from 'react'
import {
	View,
	Image,
	Text,
	Alert,
	StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationActions, StackActions } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import { connect } from 'react-redux'
import authActions from '../../authActions'

import Button from '../../components/Button'
import api from '../../services/api'
import Socket from '../../services/socket'
import styles from './styles'
import * as WebBrowser from 'expo-web-browser';

function Login(props) {
	const [loading, setLoading] = useState(true)
	const { navigation, dispatch } = props
	let authProcess = false
	async function login() {
		const socket = await Socket.getInstance()
		try {
			const authUrl = await socket.getAuthUrl()
			//Alert.alert("Aviso", "Você será redirecionado para o Github para autenticação:" + authUrl)
			await WebBrowser.openBrowserAsync(authUrl)
			await socket.listenToToken().then(async token => {
				const response = await api.get("/dev", { params: { accessToken: token } })
				showMessage({
					message: 'Seja bem-vindo',
					description: `Olá novamente ${response.data.name}`,
					type: 'success'
				})
				setTimeout(() => {
					dispatch(authActions.setToken(token))
					dispatch(authActions.setUserData(response.data))
				}, 1505)
			})
		} catch (err) {
			if (err.response.status === 404) {
				showMessage({
					message: 'Usuário não encontrado',
					description: `Você não está cadastrado`,
				})
			} else {
				showMessage({
					message: 'Erro',
					description: `Erro ao tentar autenticar` + err.message
				})
			}
		} finally {
			await socket.disconnect()
		}

	}

	function cadastrar() {

		navigation.navigate('CreateUser')
	}

	useEffect(() => {
		if (props.userData && props.accessToken) {

			navigation.reset({
				index: 0,
				routes: [{ name: 'DrawerNavigator' }],
			})


		}
	}, [props.userData, props.accessToken])

	useEffect(() => {
		async function load() {
			const storageAccessToken = await AsyncStorage.getItem("token")
			if (storageAccessToken) {
				dispatch(authActions.setUserData(JSON.parse(await AsyncStorage.getItem("userData"))))
				dispatch(authActions.setToken(storageAccessToken))
			}
			else setLoading(false)
		}
		load()
	}, [])

	if (loading) {
		return <View style={{
			backgroundColor: "#7D40E7",
			flex: 1
		}} />
	}

	else {
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
					style={StyleSheet.compose(styles.signInButton, { marginBottom: 5 })}
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
export default connect(({ accessToken, userData }) => ({ accessToken, userData }))(Login)
