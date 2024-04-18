import { useState, useEffect } from 'react'
import { createMqttClient } from 'src/Services/mqttService'


/**
 * @typedef {'Connected' | 'Disconnected' | 'Offline' | 'Reconnecting' | `TopicError: ${string}` | 'Error'} MqttStatus 
 */

/**
 * @typedef {string} MqttError
 */

/**
 * @typedef {{ message: any, topic: string }} MqttData
 */

/**
 * @typedef {import('mqtt').MqttClient} MqttClient
 */

function useMqttConnection(doMqttConnection) {

	/**
	 * @type [MqttStatus, React.Dispatch<any>]
	 */
	const [mqttStatus, setMqttStatus] = useState('Disconnected')

	/**
	 * @type [MqttError, React.Dispatch<any>]
	 */
	const [mqttError, setMqttError] = useState(null)

	/**
	 * @type [MqttData, React.Dispatch<any>]
	 */
	const [mqttData, setMqttData] = useState({})

	/**
	 * @type [MqttClient, React.Dispatch<any>]
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
