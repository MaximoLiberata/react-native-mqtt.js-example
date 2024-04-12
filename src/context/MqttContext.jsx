import React, { createContext, useContext, useState } from 'react'
import useAppStateBackground from 'src/hooks/useAppStateReconnect'
import useMqttConnection from 'src/hooks/useMqttConnection'


const MqttContext = createContext(null)

export const MqttProvider = ({ children }) => {

	const [doMqttConnection, setDoMqttConnection] = useState(true)
	const { mqttClient, mqttData, mqttStatus, mqttError, setMqttError, setMqttStatus } = useMqttConnection(doMqttConnection)

	useAppStateBackground(mqttClient)

	const subscribeToTopic = (topics, { qos = 1 } = {}) => {
		if (!mqttClient) return

		topics.map((topic) =>
			mqttClient.subscribe(topic, { qos }, (error) => {
				if (error) {
					setMqttStatus('Subscribe Error')
					setMqttError(`Name: ${error?.name}\nMessage: ${error?.message}\nCode: ${error?.code}`)
				}
			})
		)
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

export const useMqtt = () => useContext(MqttContext)
