import mqtt from 'mqtt'
import { envConfig } from 'src/config/environment'


/**
 * @typedef {{
 * 	ssl: boolean,
 * 	setMqttStatus: (status: string) => void,
 *  setMqttError: (error: string) => void,
 *  uniqueId: string,
 * 	onMessage: (topic: string, message: any) => void,
 * }} CreateMqttClientOptions
 */

/**
 * @param {CreateMqttClientOptions} options
 * 
 * @returns {mqtt.MqttClient} 
 */
function createMqttClient({
	ssl = true,
	setMqttStatus,
	setMqttError,
	uniqueId,
	onMessage,
}) {
	const host = envConfig.MQTT_HOST
	const path = '/ws'
	const protocolVersion = envConfig.MQTT_VERSION
	let port = envConfig.MQTT_PORT
	let protocol = 'ws'

	if (ssl) {
		port = envConfig.MQTT_PORT_SSL
		protocol = 'wss'
	}

	const client = mqtt.connect(`${protocol}://${host}${path}`, {
		port,
		protocolVersion,
		protocol,
		clientId: uniqueId,
		username: envConfig.MQTT_USERNAME,
		password: envConfig.MQTT_PASSWORD,
		reconnectPeriod: 5000,
		queueQoSZero: true,
		resubscribe: true,
		clean: true,
		keepalive: 30,
		properties: protocolVersion === 5 ? {
			sessionExpiryInterval: 600
		} : undefined
	})
	.on('connect', () => {
		setMqttStatus('Connected')
	})
	.on('error', (error) => {
		setMqttStatus('Error')
		setMqttError(`Name: ${error?.name}\nMessage: ${error?.message}\nCode: ${error?.code}`)
	})
	.on('disconnect', (packet) => {
		setMqttStatus('Disconnected')
	})
	.on('offline', () => {
		setMqttStatus('Offline')
	})
	.on('reconnect', () => {
		setMqttStatus('Reconnecting')
	})
	.on('close', () => {
		setMqttStatus('Disconnected')
	})
	.on('message', (topic, message, packet) => {
		onMessage(topic, message)
	})


	return client

}


export {
	createMqttClient
}
