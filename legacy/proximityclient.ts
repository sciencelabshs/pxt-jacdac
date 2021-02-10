namespace jacdac {
    const enum JDPromixityEvent {
        Close = DAL.LEVEL_THRESHOLD_LOW,
        Far = DAL.LEVEL_THRESHOLD_HIGH
    }
    
    //% fixedInstances
    export class ProximityClient extends SensorClient {
        constructor(role: string) {
            super("proxi", jd_class.PROXIMITY, role);
        }

        /**
         * Gets the distance measure by the sensor. Negative if missing
         */
        //% blockId=jdproximtitydistance block="%proximity distance"
        //% group="Promixity"
        get distance(): number {
            const s = this.state;
            if (!s || s.length < 4) return -1;
            return (s.getNumber(NumberFormat.UInt32LE, 0) / 10);
        }

        /**
         * Runs code when an event happens on the sensor
         * @param gesture
         * @param handler
         */
        //% blockId=jdproximityevent block="on %proximity %event"
        //% group="Promixity"
        onEvent(event: JDPromixityEvent, handler: () => void) {
            this.registerEvent(event, handler);
        }

    }

    //% fixedInstance whenUsed
    export const proximityClient = new ProximityClient();
}
