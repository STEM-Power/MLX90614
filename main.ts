/**
 * MLX90614 extension for microbit makecode .
 * From STEM Power Limited.
 * https://stem-power.com
 *  */

/**
 * MLX90614
 */
//% weight=100 color=#0975ff icon="\uf2c9" block="MLX90614"
namespace MLX90614 {
let ObjTData = pins.createBuffer(2);
let AmbTData = pins.createBuffer(2);
let receivedBuffer = pins.createBuffer(32);
let irData = pins.createBuffer(1);
/**
     * Setup MLX90614 module Tx Rx to micro:bit pins.
     * 設定MLX90614的Tx、Rx連接腳位
     * @param pinTX to pinTX ,eg: SerialPin.P13
     * @param pinRX to pinRX ,eg: SerialPin.P14
    */
    //% weight=100
    //% blockId="setSerial" block="set TX to %pinTX | RX to %pinRX"
    export function setSerial(pinTX: SerialPin, pinRX: SerialPin): void {
        serial.redirect(
            pinRX,
            pinTX,
            BaudRate.BaudRate9600
        )
        
    }


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
        receivedBuffer = serial.readBuffer(8);;
            for (let i = 0; i < 4; i++) {
                ObjTData[i] = receivedBuffer[0 + i];
            }

        let ObjT = (ObjTData[1]<<8 | ObjTData[0])
        ObjT *= .02
        ObjT -= 273.15
        return ObjT
	}

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
        receivedBuffer = serial.readBuffer(8);;
            for (let i = 0; i < 4; i++) {
                AmbTData[i] = receivedBuffer[0 + i];
            }

        let AmbT = (AmbTData[1]<<8 | AmbTData[0])
        AmbT *= .02
        AmbT -= 273.15
        return AmbT
	}


//% weight=89
    //% blockId="readRegister" block="Read internal register 0x06"
    export function getIR(): number {
        serial.setRxBufferSize(100)
        let serialBuffer = pins.createBuffer(3);
        serialBuffer[0] = 0x52
        serialBuffer[1] = 0x06
        serialBuffer[2] = 0x50
        serial.writeBuffer(serialBuffer)
        basic.pause(1);
        receivedBuffer = serial.readBuffer(2);;
            for (let i = 0; i < 2; i++) {
                irData[i] = receivedBuffer[0 + i];
            }

        let ir = (irData[0]<<8 | irData[1])
        return ir
	}


}


