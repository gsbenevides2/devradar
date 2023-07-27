import React, {
	useState,
	useEffect
} from 'react'
import {
	View,
	Image,
	Text,
	Alert,
	KeyboardAvoidingView,
} from 'react-native'

import { NavigationActions, StackActions } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import { connect } from 'react-redux'
import authActions from '../../authActions'

import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync
} from 'expo-location'

import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import api from '../../services/api'
import webSocket from '../../services/socket'
import styles from './styles'
import * as WebBrowser from 'expo-web-browser';

function CreateUser(props) {
	const [github_username, setGithub_username] = useState('')
	const [techs, setTechs] = useState('')
	const [latitude, setLatitude] = useState('')
	const [longitude, setLongitude] = useState('')
	useEffect(() => {
		async function LoadPosition() {
			const { granted } = await requestForegroundPermissionsAsync()
			if (granted) {
				const { coords } = await getCurrentPositionAsync({
					enableHighAccuracy: true
				})
				setLatitude(`${coords.latitude}`)
				setLongitude(`${coords.longitude}`)
			}
		}
		LoadPosition()
	}, [])

	async function addDev() {
		const socket = await webSocket.getInstance()
		try {
			const authUrl = await socket.getAuthUrl()
			WebBrowser.openBrowserAsync(authUrl)
			const accessToken = await socket.listenToToken()
			const { data } = await api.post("/dev", {
				accessToken,
				techs,
				latitude,
				longitude
			})

			showMessage({
				message: 'Seja bem-vindo',
				description: `Olá ${data.name}`,
				type: 'success'
			})
			setTimeout(() => {
				props.dispatch(authActions.setToken(accessToken))
				props.dispatch(authActions.setUserData(data))
			}, 1505)

		} catch (error) {
			console.error(error)
			const { data, status } = error.response
			if (status === 400 && data.code === "user-found") {
				Alert.alert(
					'Erro',
					'Usuário já existe'
				)
			}
			else if (status === 400) {
				Alert.alert(
					'Erro',
					data.message
				)
			}
		} finally {
			await socket.disconnect()
		}
	}

	useEffect(() => {
		if (props.userData && props.accessToken) {

			props.navigation.reset({
				index: 0,
				routes: [{ name: 'DrawerNavigator' }],
			})
		}
	}, [props.userData, props.accessToken])

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior="padding"
		>
			<Image
				style={styles.logo}
				source={require("../../../assets/signup.png")}
			/>
			<TextInput
				style={styles.inputPrinc}
				placeholder="Techs:"
				value={techs}
				onChangeText={setTechs}
			/>
			<View
				style={styles.containerSec}>
				<TextInput
					style={styles.inputSec}
					placeholder="Latitude:"
					value={latitude}
					onChangeText={setLatitude}
				/>
				<TextInput
					style={styles.inputSec}
					placeholder="Logitude:"
					value={longitude}
					onChangeText={setLongitude}
				/>
			</View>
			<Button
				onPress={addDev}
				style={styles.signInButton}
			>
				<Text style={styles.signInText}>Cadastrar</Text>
			</Button>
		</KeyboardAvoidingView>
	)
}
export default connect(({ accessToken, userData }) => ({ accessToken, userData }))(CreateUser)
