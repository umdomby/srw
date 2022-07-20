import {makeAutoObservable} from "mobx";

class Index {

    constructor() {
        this._webSocket = {}
        this._idSocket = ''
        this._messageL = 0
        this._messageR = 0
        this._messageOnOff = true
        this._messageFBL = true
        this._messageFBR = true
        this._arduinoFBL = null
        this._arduinoFBR = null
        this._reversal = false
        this._arduinoOnOff = null
        makeAutoObservable(this)
    }

    get arduinoOnOff() {return this._arduinoOnOff;}
    setArduinoOnOff(value) {this._arduinoOnOff = value;}

    get reversal() {return this._reversal;}
    setReversal(value) {this._reversal = value;}

    get arduinoFBL() {return this._arduinoFBL;}
    setArduinoFBL(value) {this._arduinoFBL = value;}

    get arduinoFBR() {return this._arduinoFBR;}
    setArduinoFBR(value) {this._arduinoFBR = value;}

    get messageFBL() {return this._messageFBL;}
    setMessageFBL(value) {this._messageFBL = value;}

    get messageFBR() {return this._messageFBR;}
    setMessageFBR(value) {this._messageFBR = value;}

    get messageOnOff() {return this._messageOnOff;}
    setMessageOnOff(value) {this._messageOnOff = value;}

    get messageL() {return this._messageL;}
    setMessageL(value) {this._messageL = value;}

    get messageR() {return this._messageR;}
    setMessageR(value) {this._messageR = value;}

    get idSocket() {return this._idSocket;}
    setIdSocket(value) {this._idSocket = value;}

    get webSocket() {return this._webSocket;}
    setWebSocket(value) {this._webSocket = value;}



}
export default new Index()
