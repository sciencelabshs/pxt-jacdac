namespace modules {
    //% fixedInstances
    export class AccelerometerClient extends jacdac.BufferedSensorClient {
        constructor(role: string) {
            super(jacdac.SRV_ACCELEROMETER, role, "i12.20 i12.20 i12.20")
        }

        /**
         * Reads the current x value from the sensor
         */
        //% blockCombine
        //% group="Accelerometer"
        //% blockSetVariable="accelerometer"
        get x(): number {
            return this.get(JDDimension.X)
        }

        /**
         * Reads the current y value from the sensor
         */
        //% blockCombine
        //% group="Accelerometer"
        //% blockSetVariable="accelerometer"
        get y(): number {
            return this.get(JDDimension.Y)
        }

        /**
         * Reads the current z value from the sensor
         */
        //% blockCombine
        //% group="Accelerometer"
        //% blockSetVariable="accelerometer"
        get z(): number {
            return this.get(JDDimension.Z)
        }

        /**
         * Reads the current strength value from the sensor
         */
        //% blockCombine
        //% group="Accelerometer"
        //% blockSetVariable="accelerometer"
        get strength(): number {
            return this.get(JDDimension.Strength)
        }

        private get(dimension: JDDimension): number {
            const values = this._reading.pauseUntilValues() as any[];
            if (!values || values.length < 3) return 0
            switch (dimension) {
                case JDDimension.X:
                case JDDimension.Y:
                case JDDimension.Z:
                    return values[dimension] * 1023
                default: {
                    // strength
                    let r = 0
                    for (let i = 0; i < 3; ++i) {
                        const x = values[i] * 1023
                        r += x * x
                    }
                    return Math.sqrt(r)
                }
            }
        }

        /**
         * Runs code when an event happens on the sensor
         * @param gesture
         * @param handler
         */
        //% blockId=jacadacacconevent block="on %accelerometer $event"
        //% group="Accelerometer"
        onEvent(event: jacdac.AccelerometerEvent, handler: () => void) {
            this.registerEvent(event, handler)
        }
    }

    //% fixedInstance whenUsed block="accelerometer1"
    export const accelerometer = new AccelerometerClient("accelerometer1")
}
