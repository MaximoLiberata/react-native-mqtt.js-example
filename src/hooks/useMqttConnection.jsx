import { useState, useEffect } from 'react'
import { createMqttClient } from 'src/Services/mqttService'

function useMqttConnection(doMqttConnection) {

	const [mqttStatus, setMqttStatus] = useState('Disconnected')
	const [mqttError, setMqttError] = useState(null)
	const [mqttData, setMqttData] = useState({})
	const [mqttClient, setMqttClient] = useState(null)

	useEffect(() => {

		if (!doMqttConnection) return

		const client = createMqttClient({
			setMqttStatus,
			setMqttError,
			uniqueId: 'react-native-0000',
			onMessage: (topic, message) => {
				setMqttData(() => ({
					message,
					topic
				}))
			},
		})

		setMqttClient(client)


		return () => {
			if (client) {
				client.end()
			}
		}

	}, [doMqttConnection])


	return {
		mqttClient,
		mqttData,
		mqttStatus,
		mqttError,
		setMqttStatus,
		setMqttError
	}

}

export default useMqttConnection
