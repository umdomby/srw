import store from "../Store"

export const messageR = (R) => {
    store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messagesR',
        messageR: R,
        messageL: store.messageL,
        accel: 1,
        stop: 0
    }))
}
