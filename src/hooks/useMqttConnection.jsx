import { useState, useEffect } from 'react'
import { createMqttClient } from 'src/Services/mqttService'


/**
 * @typedef {'Connected' | 'Disconnected' | 'Offline' | 'Reconnecting' | 'Error'} MqttStatus 
 */

/**
 * @typedef {{ type: string, msg: string }} MqttError
 */

/**
 * @typedef {{ message: any, topic: string }} MqttData
 */

/**
 * @typedef {import('mqtt').MqttClient} MqttClient
 */

function useMqttConnection(doMqttConnection) {

	/**
	 * @type [MqttStatus, React.Dispatch<MqttStatus>]
	 */
	const [mqttStatus, setMqttStatus] = useState('Disconnected')

	/**
	 * @type [MqttError, React.Dispatch<MqttError>]
	 */
	const [mqttError, setMqttError] = useState({})

	/**
	 * @type [MqttData, React.Dispatch<MqttData>]
	 */
	const [mqttData, setMqttData] = useState({})

	/**
	 * @type [MqttClient, React.Dispatch<MqttClient>]
	 */
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
