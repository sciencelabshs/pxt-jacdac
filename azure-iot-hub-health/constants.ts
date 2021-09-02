namespace jacdac {
    // Service: Azure IoT Hub Health
    export const SRV_AZURE_IOT_HUB_HEALTH = 0x1462eefc

    export const enum AzureIotHubHealthConnectionStatus { // uint16_t
        Connected = 0x0,
        Disconnected = 0x1,
        Connecting = 0x2,
        Disconnecting = 0x3,
    }

    export const enum AzureIotHubHealthReg {
        /**
         * Read-only string (bytes). Something like `my-iot-hub.azure-devices.net`; empty string when not properly configured
         *
         * ```
         * const [hubName] = jdunpack<[string]>(buf, "s")
         * ```
         */
        HubName = 0x180,

        /**
         * Read-only string (bytes). Device identifier in Azure Iot Hub
         *
         * ```
         * const [hubDeviceId] = jdunpack<[string]>(buf, "s")
         * ```
         */
        HubDeviceId = 0x181,

        /**
         * Read-only ConnectionStatus (uint16_t). Indicates the status of connection. A message beyond the [0..3] range represents an HTTP error code.
         *
         * ```
         * const [connectionStatus] = jdunpack<[jacdac.AzureIotHubHealthConnectionStatus]>(buf, "u16")
         * ```
         */
        ConnectionStatus = 0x182,

        /**
         * Reads internal statistics about messages sent to the hub.
         *
         * ```
         * const [reading, event, twinReported, twinDesired] = jdunpack<[number, number, number, number]>(buf, "u32 u32 u32 u32")
         * ```
         */
        Statistics = 0x183,
    }

    export const enum AzureIotHubHealthCmd {
        /**
         * No args. Starts a connection to the IoT hub service
         */
        Connect = 0x81,

        /**
         * No args. Starts disconnecting from the IoT hub service
         */
        Disconnect = 0x82,

        /**
         * Argument: connection_string string (bytes). Restricted command to override the existing connection string to the Azure IoT Hub.
         *
         * ```
         * const [connectionString] = jdunpack<[string]>(buf, "s")
         * ```
         */
        SetConnectionString = 0x86,
    }

    export const enum AzureIotHubHealthEvent {
        /**
         * Argument: connection_status ConnectionStatus (uint16_t). Raised when the connection status changes
         *
         * ```
         * const [connectionStatus] = jdunpack<[jacdac.AzureIotHubHealthConnectionStatus]>(buf, "u16")
         * ```
         */
        //% block="connection status change"
        ConnectionStatusChange = 0x3,
    }

}