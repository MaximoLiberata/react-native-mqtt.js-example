
const envConfig = {
  TZ: process.env.EXPO_PUBLIC_TZ ?? 'UTC',
  MQTT_HOST: process.env.EXPO_PUBLIC_MQTT_HOST ?? 'localhost',
  MQTT_SSL: process.env.EXPO_PUBLIC_MQTT_SSL === 'true',
  MQTT_PORT: typeof process.env.EXPO_PUBLIC_MQTT_PORT === 'string' ? parseInt(process.env.EXPO_PUBLIC_MQTT_PORT) : 0,
  MQTT_PORT_SSL: typeof process.env.EXPO_PUBLIC_MQTT_PORT_SSL === 'string' ? parseInt(process.env.EXPO_PUBLIC_MQTT_PORT_SSL) : 0,
  MQTT_VERSION: typeof process.env.EXPO_PUBLIC_MQTT_VERSION === 'string' ? parseInt(process.env.EXPO_PUBLIC_MQTT_VERSION) : 0,
  MQTT_QOS: typeof process.env.EXPO_PUBLIC_MQTT_QOS === 'string' ? parseInt(process.env.EXPO_PUBLIC_MQTT_QOS) : 0,
  MQTT_USERNAME: (process.env.EXPO_PUBLIC_MQTT_USERNAME ?? '').length === 0 ? undefined : process.env.EXPO_PUBLIC_MQTT_USERNAME,
  MQTT_PASSWORD: (process.env.EXPO_PUBLIC_MQTT_PASSWORD ?? '').length === 0 ? undefined : process.env.EXPO_PUBLIC_MQTT_PASSWORD,
  MQTT_TOPICS: typeof process.env.EXPO_PUBLIC_MQTT_TOPICS === 'string' ? process.env.EXPO_PUBLIC_MQTT_TOPICS.split(',') : [],
  EMIT_CONSOLE_LOGS: process.env.EXPO_PUBLIC_EMIT_CONSOLE_LOGS === 'true',
}


export {
  envConfig
}