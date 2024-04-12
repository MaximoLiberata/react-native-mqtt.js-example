
const envConfig = {
  TZ: process.env.EXPO_PUBLIC_TZ ?? 'UTC',
  MQTT_HOST: process.env.EXPO_PUBLIC_MQTT_HOST ?? 'localhost',
  MQTT_SSL: process.env.EXPO_PUBLIC_MQTT_SSL === 'true',
  MQTT_PORT: typeof process.env.EXPO_PUBLIC_MQTT_PORT === 'string' ? parseInt(process.env.EXPO_PUBLIC_MQTT_PORT) : 0,
  MQTT_PORT_SSL: typeof process.env.EXPO_PUBLIC_MQTT_PORT_SSL === 'string' ? parseInt(process.env.EXPO_PUBLIC_MQTT_PORT_SSL) : 0,
  MQTT_USERNAME: process.env.EXPO_PUBLIC_MQTT_USERNAME,
  MQTT_PASSWORD: process.env.EXPO_PUBLIC_MQTT_PASSWORD,
  MQTT_TOPICS: typeof process.env.EXPO_PUBLIC_MQTT_TOPICS === 'string' ? process.env.EXPO_PUBLIC_MQTT_TOPICS.split(',') : [],
}


export {
  envConfig
}