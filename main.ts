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
let ToData = pins.createBuffer(2);
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


//% weight=90
    //% blockId="getTo" block="Object Temperature"
    export function getTo(): number {
        serial.setRxBufferSize(100)
        let serialBuffer = pins.createBuffer(8);
        serialBuffer[0] = 0x53
        serialBuffer[1] = 0xB4
        serialBuffer[2] = 0x02
        serialBuffer[3] = 0x07
        serialBuffer[4] = 0x53
        serialBuffer[5] = 0xB5
        serialBuffer[6] = 0x04
        serialBuffer[7] = 0x50
        serial.writeBuffer(serialBuffer)
        let ToBuffer: number[] = []
        basic.pause(1);
        receivedBuffer = serial.readBuffer(8);;
            for (let i = 0; i < 2; i++) {
                ToData[i] = receivedBuffer[0 + i];
            }

        let to = (ToData[1]<<8 | ToData[0])
        to *= .02
        to -= 273.15
        return to
	}

//% weight=89
    //% blockId="readRegister" block="Read internal register 0x06"
    export function getIR(): number {
        serial.setRxBufferSize(100)
        let serialBuffer = pins.createBuffer(5);
        serialBuffer[0] = 0x52
        serialBuffer[1] = 0x06
        serialBuffer[2] = 0x07
        serialBuffer[3] = 0x08
        serialBuffer[4] = 0x50
        serial.writeBuffer(serialBuffer)
        basic.pause(1);
        receivedBuffer = serial.readBuffer(8);;
            for (let i = 0; i < 3; i++) {
                irData[i] = receivedBuffer[0 + i];
            }

        let ir = (irData[0])
        return ir
	}


}


