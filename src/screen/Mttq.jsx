import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { envConfig } from 'src/config/environment'
import { useMqtt } from 'src/context/MqttContext'


const MttqScreen = () => {

	const { mqttClient, mqttData, mqttStatus, mqttError, subscribeToTopic } = useMqtt()

	useEffect(() => {
		subscribeToTopic(envConfig.MQTT_TOPICS, { qos: envConfig.MQTT_QOS })
	}, [])


	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				gap: 20,
			}}
		>
			<Text>Connection status: {mqttStatus}</Text>
			<Text>Topic: {mqttData?.topic ?? 'N/A'}</Text>
			<Text>Date: {(new Date()).toLocaleString('af-ZA', { timeZone: envConfig.TZ })}</Text>
			<Text>Error: {mqttError ?? 'N/A'}</Text>
			<Button title='Mttq-conect' onPress={() => mqttClient.reconnect()} />
			<Button title='Mttq-disconect' onPress={() => mqttClient.end()} />
		</View>
	)

}

StyleSheet.create({})


export default MttqScreen
