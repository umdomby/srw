import store from "../Store"
const WebSocketProject = (id) => {

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
                    }))
                }
            }

            store.webSocket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                if (store.webSocket.readyState !== store.webSocket.CLOSED && store.webSocket.readyState !== store.webSocket.CLOSING) {
                    switch (msg.method) {
                        case "connection":
                            console.log(`пользователь ${msg.id} присоединился`)
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
                        case "messagesFBL":
                            console.log('From arduino messageFBL ' + msg.messageFBL)
                            store.setArduinoFBL(msg.messageFBL)
                            break
                        case "messagesFBR":
                            console.log('From arduino messageFBR ' + msg.messageFBR)
                            store.setArduinoFBR(msg.messageFBR)
                            break

                        default:
                            console.log('default')
                    }
                }
            }
    }catch (e) {
        console.log(e + ' no connected')
    }

    return ([])
}

export default WebSocketProject
