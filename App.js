import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './src/navigator/Navigation'
import { MqttProvider } from 'src/context/MqttContext'

// For MQTT.js library
process.nextTick = (callback) => {
	setTimeout(callback, 0)
}

export default function App() {

	return (
		<MqttProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaProvider>
					<Navigation />
					<StatusBar style='light' />
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</MqttProvider>
	)
}
