import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { View } from 'react-native'

export default function DrawerButton(props) {
	const { navigation, tintColor } = props
	return (
		<MaterialIcons
			name="menu"
			color={tintColor}
			style={{ marginLeft: 12 }}
			size={28}
			onPress={() =>
				navigation.toggleDrawer()
			} />
	)
}
