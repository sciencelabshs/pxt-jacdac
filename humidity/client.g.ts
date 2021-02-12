namespace modules {
    /**
     * A sensor measuring humidity of outside environment.
     **/
    //% fixedInstances blockGap=8
    export class HumidityClient extends jacdac.SensorClient<[number]> {
            

            constructor(role: string) {
            super(jacdac.SRV_HUMIDITY, role, "u22.10");
            
        }
    

        /**
        * The relative humidity in percentage of full water saturation.
        */
        //% blockId=jacdac_humidity_humidity___get
        //% group="Humidity"
        //% block="%humidity humidity" callInDebugger
        humidity(): number {
            this.setStreaming(true);            
            const values = this._reading.pauseUntilValues() as any[];
            return values[0];
        } 

    }
    //% fixedInstance whenUsed
    export const humidity = new HumidityClient("humidity");
}