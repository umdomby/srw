import store from "../Store"
import {Buffer} from 'buffer';

const WebSocketProject = (id, persId) => {

    try {
        // if (store.webSocket.readyState !== store.webSocket.CLOSED && store.webSocket.readyState !== store.webSocket.CLOSING){
        //     store.webSocket.close()
        // }

        store.setWebSocket(new WebSocket('wss://servicerobot.pro:4433'))
        //store.setWebSocket(new WebSocket('wss://umdom.by:4433'))
        //store.setWebSocket(new WebSocket('wss://localhost:4433'))


            store.webSocket.onopen = () => {
                if (store.webSocket.readyState === 1){
                    store.webSocket.send(JSON.stringify({
                        id: id,
                        username: 'user',
                        method: "connection",
                        persId: persId
                    }))
                }
            }

            store.webSocket.onmessage = (event) => {
            try{
                let msg = JSON.parse(event.data)
                if (store.webSocket.readyState !== store.webSocket.CLOSED && store.webSocket.readyState !== store.webSocket.CLOSING) {
                    switch (msg.method) {
                        case "connection":
                            console.log(`пользователь ${msg.id} присоединился ${msg.persId}`)
                            break
                        case "messagesL":
                            console.log("from server messageL " + msg.messageL)
                            break
                        case "messagesR":
                            console.log("from server messageR " + msg.messageR)
                            break
                        case "messagesOnOff":
                            console.log('From arduino messageOnOff ' + msg.messageOnOff)
                            store.setArduinoOnOff(msg.messageOnOff)
                            break
                        case "messagesStop":
                            console.log("from server messageStop")
                            break
                        case "messagesFBLR":
                            console.log('From arduino messageFBL ' + msg.messageFBL)
                            console.log('From arduino messageFBR ' + msg.messageFBR)
                            //store.setArduinoFBL(msg.messageFBL)
                            break
                        case "textSpeak":
                            console.log('From react textSpeak ' + msg.text)
                            store.setTextSpeak(msg.text)
                            //store.setArduinoFBR(msg.messageFBR)
                            break
                        case "noSpeech":
                            console.log('noSpeech')
                            store.setNoSpeech(!store.noSpeech)
                            break
                        case "youTubeLink":
                            console.log('youTubeLink')
                            store.setYouTubeLink(msg.message)
                            store.setYouTubePlaying(msg.playing)
                            break
                        case "audioURL":
                            console.log(msg.message)
                            store.setAudioURL(msg.message)
                            store.setAudioPlaying(msg.playing)
                            break
                        case "audioURLto":
                            store.setAudioPlaying(!store.audioPlaying)
                            console.log(store.audioPlaying)
                            break
                        default:
                            console.log('default arduino')
                    }
                }
            }catch (e) {
                // console.log(window.atob(store.audioURL))
                console.log(event.data)
                // var a = Buffer.from(event.data, 'base64').toString('utf8')
                // store.setAudioURL(a)
                //console.log(a)
                // console.log(Buffer.from(event.data, 'base64').toString('ascii'));
            }

            }
    }catch (e) {
        console.log(e + ' no connected')
    }

    return ([])
}

export default WebSocketProject
