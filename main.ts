/**
 * MLX90614 extension for microbit makecode .
 * From STEM Power Limited.
 * https://stem-power.com
 *  */

/**
 * MLX90614 IR thermometer
 */
//% weight=100 color=#0975ff icon="\uf2c9" block="MLX90614"
namespace MLX90614 {
let ObjTData = pins.createBuffer(8);
let AmbTData = pins.createBuffer(8);
let receivedBuffer = pins.createBuffer(32);
let irData = pins.createBuffer(2);
/**
     * initiate setup MLX90614 module.
     * 設定MLX90614
     */
     //% weight=100
     //% blockId="Initiate" block="Initiate"
     export function Initiate(): void {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P16,
            BaudRate.BaudRate9600
        )
        
    }

     /**
     * read the surface temperature of an object, temperature reading in Celsius
     */
     //% weight=99
     //% blockId="getObjT" block="Object Temperature"
     export function getObjT(): number {
        serial.setRxBufferSize(100)
        let serialBuffer = pins.createBuffer(8);
        serialBuffer[0] = 0x53
        serialBuffer[1] = 0xB4
        serialBuffer[2] = 0x01
        serialBuffer[3] = 0x07
        serialBuffer[4] = 0x53
        serialBuffer[5] = 0xB5
        serialBuffer[6] = 0x04
        serialBuffer[7] = 0x50
        serial.writeBuffer(serialBuffer)
        let ObjTBuffer: number[] = []
        basic.pause(1);
        receivedBuffer = serial.readBuffer(4);;
            for (let i = 0; i < 8; i++) {
                ObjTData[i] = receivedBuffer[0 + i];
            }

        let ObjT = (ObjTData[1]<<8 | ObjTData[0])
        ObjT *= .02
        ObjT -= 273.15
        return ObjT
	}

    /**
    * read the ambient temperature, temperature reading in Celsius
    */
    //% weight=98
    //% blockId="getAmbT" block="Ambient Temperature"
    export function getAmbT(): number {
        serial.setRxBufferSize(100)
        let serialBuffer = pins.createBuffer(8);
        serialBuffer[0] = 0x53
        serialBuffer[1] = 0xB4
        serialBuffer[2] = 0x01
        serialBuffer[3] = 0x06
        serialBuffer[4] = 0x53
        serialBuffer[5] = 0xB5
        serialBuffer[6] = 0x04
        serialBuffer[7] = 0x50
        serial.writeBuffer(serialBuffer)
        let AmbTBuffer: number[] = []
        basic.pause(1);
        receivedBuffer = serial.readBuffer(4);;
            for (let i = 0; i < 8; i++) {
                AmbTData[i] = receivedBuffer[0 + i];
            }

        let AmbT = (AmbTData[1]<<8 | AmbTData[0])
        AmbT *= .02
        AmbT -= 273.15
        return AmbT
	}




}


