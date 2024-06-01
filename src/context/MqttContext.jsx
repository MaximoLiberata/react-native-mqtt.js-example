import React, { createContext, useContext, useState } from 'react'
import useAppStateBackground from 'src/hooks/useAppStateReconnect'
import useMqttConnection from 'src/hooks/useMqttConnection'
import { emitStateError } from 'src/Services/errorHandler'


/**
 * @typedef {(topics: string[], options?: { qos: 0 | 1 | 2 }) => void} SubscribeToTopic
 */

const MqttContext = createContext(null)

export const MqttProvider = ({ children }) => {

	const [doMqttConnection, setDoMqttConnection] = useState(true)
	const { mqttClient, mqttData, mqttStatus, mqttError, setMqttError, setMqttStatus } = useMqttConnection(doMqttConnection)

	useAppStateBackground(mqttClient)

	/**
	 * @type {SubscribeToTopic}
	 */
	const subscribeToTopic = (topics, { qos = 1 } = {}) => {

		if (!mqttClient) return

		for (const topic of topics) {

			mqttClient.subscribe(topic, { qos }, (error, granted) => {
				if (error) {
					setMqttStatus('Error');
					emitStateError(setMqttError, 'MqttTopic', error);
				}
			});

		}

	}


	return (
		<MqttContext.Provider
			value={{
				mqttClient,
				mqttData,
				mqttStatus,
				mqttError,
				subscribeToTopic,
				setDoMqttConnection,
			}}
		>
			{children}
		</MqttContext.Provider>
	)

}


/**
 * @type {{() => {
 * 	mqttClient: import('src/hooks/useMqttConnection').MqttClient,
 * 	mqttData: import('src/hooks/useMqttConnection').MqttData,
 * 	mqttStatus: import('src/hooks/useMqttConnection').MqttStatus,
 * 	mqttError: import('src/hooks/useMqttConnection').MqttError,
 * 	subscribeToTopic: SubscribeToTopic,
 * }}}
 */
export const useMqtt = () => useContext(MqttContext)
