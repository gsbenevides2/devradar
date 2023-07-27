import React, {
	useEffect,
	useState,
	useRef
} from 'react'
import {
	StyleSheet,
	Image,
	View,
	Text,
	TouchableOpacity
} from 'react-native'

import MapView,
{ Marker, Callout }
	from 'react-native-maps'

import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync
} from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import TextInput from '../../components/TextInput'
import api from '../../services/api'
import Socket from '../../services/socket'

function Main({ navigation }) {
	const [devs, setDevs] = useState([])
	const [currentRegion, setCurrentRegion] = useState(null)
	const [techs, setTechs] = useState('')
	const Map = useRef(null)
	async function loadInitialPosition() {
		const { granted } = await requestForegroundPermissionsAsync()

		if (granted) {
			const { coords } = await getCurrentPositionAsync({
				enableHighAccuracy: true
			})

			const { latitude, longitude } = coords

			setCurrentRegion({
				latitude,
				longitude,
				latitudeDelta: 0.04,
				longitudeDelta: 0.04
			})
		}
	}
	useEffect(() => {
		loadInitialPosition()
	}, [])
	async function resetLocation() {
		const { granted } = await requestForegroundPermissionsAsync()

		if (granted) {
			const { coords } = await getCurrentPositionAsync({
				enableHighAccuracy: true
			})

			const { latitude, longitude } = coords

			setCurrentRegion({
				latitude,
				longitude,
				latitudeDelta: 0.04,
				longitudeDelta: 0.04
			})
			Map.current.animateToRegion({
				latitude,
				longitude,
				latitudeDelta: 0.04,
				longitudeDelta: 0.04
			}, 2000
			)
		}
	}
	async function loadDevs() {
		const socket = await Socket.getInstance()
		const { latitude, longitude } = currentRegion

		const response = await api.get('/search', {
			params: {
				latitude,
				longitude,
				techs
			}
		})

		setDevs(response.data)
		socket.disconnect()
		const newSocket = await Socket.getInstance()
		newSocket.subscribeToNewDevs({
			latitude,
			longitude,
			techs
		})
	}
	useEffect(() => {
		Socket.getInstance().then(socket => {
			socket.receiveDevs(dev => setDevs([...devs, dev]))
		})
		/*
		return () => {
			Socket.getInstance().disconnect()
		}
		*/
	}, [])
	function handleRegionChange(region) {
		if (techs !== '') {
			loadDevs()
		}
		setCurrentRegion(region)
	}

	if (!currentRegion) {
		return null
	}

	return (
		<>
			<MapView
				ref={Map}
				showsCompass={false}
				onRegionChangeComplete={handleRegionChange}
				initialRegion={currentRegion}
				style={styles.map}>
				{devs.map(dev => (
					<Marker
						key={dev._id}
						coordinate={{
							longitude: dev.location.coordinates[0],
							latitude: dev.location.coordinates[1]
						}}
					>
						<Image
							style={styles.avatar}
							source={{ uri: dev.avatar_url }}
						/>

						<Callout onPress={() => {
							navigation.navigate('Profile', {
								github_username: dev.github_username
							})
						}}>
							<View style={styles.callout}>
								<Text style={styles.devName}>{dev.name}</Text>
								<Text style={styles.devBio}>{dev.bio}</Text>
								<Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
							</View>
						</Callout>
					</Marker>

				))}
			</MapView>

			<View style={styles.searchForm}>
				<TextInput
					placeholder="Buscar devs por techs..."
					placeholderTextColor="#999"
					autoCapitalize="words"
					autoCorrect={false}
					value={techs}
					onChangeText={setTechs}
				/>

				<TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
					<MaterialIcons name="search" size={20} color='#FFF' />
				</TouchableOpacity>
				<TouchableOpacity onPress={resetLocation} style={styles.loadButton}>
					<MaterialIcons name="my-location" size={20} color='#FFF' />
				</TouchableOpacity>

			</View>
		</>
	)
}

const styles = StyleSheet.create({
	map: {
		flex: 1
	},

	avatar: {
		width: 54,
		height: 54,
		borderRadius: 4,
		borderWidth: 4,
		borderColor: '#FFF'
	},

	callout: {
		width: 260
	},

	devName: {
		fontWeight: 'bold',
		fontSize: 16
	},

	devBio: {
		color: '#666',
		marginTop: 5
	},

	devTechs: {
		marginTop: 5
	},

	searchForm: {
		position: 'absolute',
		top: 20,
		left: 20,
		right: 20,
		zIndex: 5,
		flexDirection: 'row'
	},

	loadButton: {
		width: 50,
		height: 50,
		backgroundColor: '#7D40E7',
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 15
	}
})

export default Main
