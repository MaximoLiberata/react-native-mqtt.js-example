# MQTT.js implementation example for React Native

This is a simple example of how to use [MQTT.js](https://github.com/mqttjs/MQTT.js) in a React Native project. This example also is using [Expo](https://expo.dev/) to make it easier to run the project.


## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Config MQTT.js in React Native](#config-mqtt.js-in-react-native)
- [About important files](#about-important-files)
- [Contributing](#contributing)


<a name="getting-started"></a>

## Getting Started

1. Clone this repository
2. Install the dependencies with `npm install`
3. Copy the `.env.example` file to `.env` and configure the MQTT broker settings
4. Run the project with `npm start`
5. Open the project in your device using the [Expo Go APP](https://play.google.com/store/apps/details?id=host.exp.exponent) reading the QR code that will appear in the terminal.
6. Publish a message from your MQTT Broker


<a name="environment-variables"></a>

## Environment Variables
<table>
    <tr>
        <th>Variable</th>
        <th>Type</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_TZ<code></td>
        <td>string</td>
        <td>Timezone will be used to format the date</td>
        <td>UTC | America/Santo_Domingo</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_HOST<code></td>
        <td>string</td>
        <td>MQTT Broker Host</td>
        <td>localhost | domin.com</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_PORT<code></td>
        <td>number</td>
        <td>MQTT Broker Port</td>
        <td>1883</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_PORT_SSL<code></td>
        <td>number</td>
        <td>MQTT Broker SSL Port</td>
        <td>8883</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_SSL<code></td>
        <td>boolean</td>
        <td>Enable connection via SSL</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_QOS</code></td>
        <td>number</td>
        <td>MQTT Broker Quality of Service</td>
        <td>0 | 1 | 2</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_USERNAME<code></td>
        <td>string</td>
        <td>MQTT Broker Username</td>
        <td>producer | consumer</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_PASSWORD<code></td>
        <td>string</td>
        <td>MQTT Broker Password</td>
        <td>123 | 456</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_TOPICS<code></td>
        <td>string</td>
        <td>MQTT Broker Topics separated by comma <code>,</code></td>
        <td>topic/1 | topic/1,topic/2 | topic/#</td>
    </tr>
</table>


<a name="config-mqtt.js-in-react-native"></a>

## Config MQTT.js in React Native

React Native (RN) doesn't support some technologies as web browsers does, in RN the mqtt client always will be established from a `WebSocket` instance, for that reason you need some extra packages to make it work. Here is a list of the packages that you need to install to make it work:

- [url](https://www.npmjs.com/package/url)
- [buffer](https://www.npmjs.com/package/buffer)

Also some packages of `mqtt` library use `process.nextTick` function, to prevent errors with those packages you need to add the following line of code to your entry file (in this project is `App.js`):

```
process.nextTick = (callback) => {
    setTimeout(callback, 0)
}
```


<a name="about-important-files"></a>

## About important files
<table>
    <tr>
        <th>File</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>/App.js</code></td>
        <td>Main entry point of the application</td>
    </tr>
    <tr>
        <td><code>/src/screen/Mttq.jsx</code></td>
        <td>The screen that will show the MQTT logs</td>
    </tr>
</table>


## Motivation

I was looking for a simple example of how to use MQTT.js in a React Native project, but I couldn't find any. So I decided to create this example to help others that are looking for the same thing. In the process I found a issue with the `mqtt` package that I had to fix, the PR is in [(#1840)](https://github.com/mqttjs/MQTT.js/pull/1840) if you want to check it out.


<a name="contributing"></a>

## Contributing

Feel free to make a PR if you find any issue or if you want to improve this example. Also, if you have any other issue with the `mqtt` package, feel free to open an issue in the [MQTT.js](https://github.com/mqttjs/MQTT.js) repository.


## Contributors

- [Juan Carlos](https://github.com/JuanCarlos008): author of this example
- [Máximo Liberata](https://github.com/MaximoLiberata): author of the PR that fixed the issue with the `mqtt` package