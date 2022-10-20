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
        this._rulingControl = ''
        this._textSpeak = ''
        this._textSpeakFrom = ''
        this._noSpeech = false
        this._youTubeLink = ''
        this._youTubePlaying = false
        this._audioURL = ''
        this._jookTxt = ''
        this._audioPlaying = 0
        this._meSend = false
        this._audioVolume = 1
        this._speedControl = 1
        this._mongoMusic = []
        this._mongoMusicPl = []
        this._mongoJook = []
        this._mongoJookPl = []
        makeAutoObservable(this)
    }

    get jookTxt() {return this._jookTxt;}
    setJookTxt(value) {this._jookTxt = value;}

    get mongoJook() {return this._mongoJook}
    setMongoJook(value) {this._mongoJook = value}

    get mongoJookPl() {return this._mongoJookPl}
    setMongoJookPl(value) {this._mongoJookPl = value}

    get mongoMusic() {return this._mongoMusic}
    setMongoMusic(value) {this._mongoMusic = value}

    get mongoMusicPl() {return this._mongoMusicPl}
    setMongoMusicPl(value) {this._mongoMusicPl = value}

    get speedControl() {return this._speedControl}
    setSpeedControl(value) {this._speedControl = value}

    get audioVolume() {return this._audioVolume}
    setAudioVolume(value) {this._audioVolume = value;}

    get meSend() {return this._meSend;}
    setMeSend(value) {this._meSend = value;}

    get audioURL() {return this._audioURL;}
    setAudioURL(value) {this._audioURL = value;}

    get audioPlaying() {return this._audioPlaying;}
    setAudioPlaying(value) {this._audioPlaying = value;}

    get youTubeLink() {return this._youTubeLink;}
    setYouTubeLink(value) {this._youTubeLink = value;}

    get youTubePlaying() {return this._youTubePlaying;}
    setYouTubePlaying(value) {this._youTubePlaying = value;}

    get noSpeech() {return this._noSpeech;}
    setNoSpeech(value) {this._noSpeech = value;}

    get textSpeakFrom() {return this._textSpeakFrom;}
    setTextSpeakFrom(value) {this._textSpeakFrom = value;}

    get textSpeak() {return this._textSpeak;}
    setTextSpeak(value) {this._textSpeak = value;}

    get rulingControl() {return this._rulingControl;}
    setRulingControl(value) {this._rulingControl = value;}

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
