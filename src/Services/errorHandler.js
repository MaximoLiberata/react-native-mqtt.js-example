import { envConfig } from 'src/config/environment';


/**
 * @typedef {"MqttTopic" | "MqttGeneral"} ErrorType
 */

/**
 * @param {Error} error 
 * @returns {string}
 */
const processError = (error) => {
    return `Name: ${error?.name} || Message: ${error?.message} || Code: ${error?.code}`;
}

/**
 * @param {ErrorType} type
 * @param {Error} error
 */
const logError = (type, error) => {
    const errorMsg = processError(error);
    console.log(`${'[Error:' + type + ']'} || ${errorMsg}`);
}

/**
 * @param {(value: import('../hooks/useMqttConnection').MqttError) => void} callback
 * @param {ErrorType} type
 * @param {Error} error
 */
const emitStateError = (callback, type, error) => {

    const errorMsg = processError(error).replace(/ \|\|{0,2} /g, '\n');

    callback({
        type: '[Error:' + type + ']',
        msg: errorMsg
    });

    if (envConfig.EMIT_CONSOLE_LOGS) {
        logError(type, error);
    }

}


export {
    logError,
    emitStateError
}

