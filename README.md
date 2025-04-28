# MQTT.js implementation example for React Native

This is a simple example of how to use [MQTT.js](https://github.com/mqttjs/MQTT.js) in a React Native project. This example also is using [Expo](https://expo.dev/) to make it easier to run the project.


## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
  - [Example Mosquitto Broker](#example-mosquitto-broker)
- [Using MQTT.js in React Native](#using-mqttjs-in-react-native)
- [About important files](#about-important-files)
- [Known Issues](#known-issues)
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
        <td><code>EXPO_PUBLIC_TZ</code></td>
        <td>string</td>
        <td>Timezone will be used to format the date</td>
        <td>UTC | America/Santo_Domingo</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_EMIT_CONSOLE_LOGS</code></td>
        <td>boolean</td>
        <td>Show in console all error logs</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_HOST</code></td>
        <td>string</td>
        <td>MQTT Broker Host</td>
        <td>localhost | domain.com</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_PORT</code></td>
        <td>number</td>
        <td>MQTT Broker Port</td>
        <td>1883</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_PORT_SSL</code></td>
        <td>number</td>
        <td>MQTT Broker SSL Port</td>
        <td>8883</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_SSL</code></td>
        <td>boolean</td>
        <td>Enable connection via SSL</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_VERSION</code></td>
        <td>number</td>
        <td>MQTT Protocol Version</td>
        <td>
            <code>3</code> = 3.1
            </br>
            <code>4</code> = 3.1.1
            </br>
            <code>5</code> = 5
        </td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_QOS</code></td>
        <td>number</td>
        <td>MQTT Broker Quality of Service</td>
        <td>0 | 1 | 2</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_USERNAME</code></td>
        <td>string</td>
        <td>MQTT Broker Username</td>
        <td>producer | consumer</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_PASSWORD</code></td>
        <td>string</td>
        <td>MQTT Broker Password</td>
        <td>123 | 456</td>
    </tr>
    <tr>
        <td><code>EXPO_PUBLIC_MQTT_TOPICS</code></td>
        <td>string</td>
        <td>MQTT Broker Topics separated by comma <code>,</code></td>
        <td>topic/1 | topic/1,topic/2 | topic/#</td>
    </tr>
</table>


<a name="example-mosquitto-broker"></a>

### Example Mosquitto Broker

[Mosquitto Test Server Configuration](https://test.mosquitto.org/)

```
# APP
EXPO_PUBLIC_TZ = "UTC"
EXPO_PUBLIC_EMIT_CONSOLE_LOGS = true

# MQTT
EXPO_PUBLIC_MQTT_HOST     = "test.mosquitto.org"
EXPO_PUBLIC_MQTT_PORT     = 8080
EXPO_PUBLIC_MQTT_PORT_SSL = 8081
EXPO_PUBLIC_MQTT_SSL      = true
EXPO_PUBLIC_MQTT_VERSION  = 4
EXPO_PUBLIC_MQTT_QOS      = 0
EXPO_PUBLIC_MQTT_USERNAME = ""
EXPO_PUBLIC_MQTT_PASSWORD = ""
EXPO_PUBLIC_MQTT_TOPICS   = "#"
```


<a name="using-mqttjs-in-react-native"></a>

## Using MQTT.js in React Native

1. Configure the `metro.config.js` file to use the `mqtt` package as a default import.

```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;

module.exports = config;
```

<em>Note: `unstable_enablePackageExports` will be removed in the future when it stabilizes, so be sure to check the [Expo documentation](https://reactnative.dev/blog/2023/06/21/package-exports-support) and follow the latest updates.</em>

2. Import the `mqtt` package:
```javascript
import mqtt from 'mqtt';
```

Alternatively, if you don't want to use default import and metro config file, you can use the following import statement:

```javascript
import mqtt from 'mqtt/dist/mqtt.esm.js';
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


<a name="known-issues"></a>

## Known Issues
These are some known issues that you _may_ encounter when using this example.

- **Keepalive timeout**
    - The app crashes because it gets overwhelmed with the thousands of messages coming from broker, e.g. using mosquitto broker with `#` topic.

If you find any solution to these issues, feel free to open a PR, look at the [Contributing](#contributing) section for more information.

## Motivation

I was looking for a simple example of how to use MQTT.js in a React Native project, but I couldn't find any. So I decided to create this example to help others that are looking for the same thing. In the process I found a issue with the `mqtt` package that I had to fix, the PR is in [(#1840)](https://github.com/mqttjs/MQTT.js/pull/1840) if you want to check it out.


<a name="contributing"></a>

## Contributing

Feel free to make a PR if you find any issue or if you want to improve this example. Also, if you have any other issue with the `mqtt` package, feel free to open an issue in the [MQTT.js](https://github.com/mqttjs/MQTT.js) repository.


## Contributors

- [Juan Carlos](https://github.com/JuanCarlos008): author of this example
- [Máximo Liberata](https://github.com/MaximoLiberata): author of the PR that fixed the issue with the `mqtt` package