// const crypto = require("crypto");
//
// class Encrypter {
//     constructor(encryptionKey) {
//         this.algorithm = "aes-192-cbc";
//         this.key = crypto.scryptSync(encryptionKey, "salt", 24);
//     }
//     encrypt(clearText) {
//         const iv = crypto.randomBytes(16);
//         const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
//         const encrypted = cipher.update(clearText, "utf8", "hex");
//         return [
//             encrypted + cipher.final("hex"),
//             Buffer.from(iv).toString("hex"),
//         ].join("|");
//     }
//     dencrypt(encryptedText) {
//         const [encrypted, iv] = encryptedText.split("|");
//         if (!iv) throw new Error("IV not found");
//         const decipher = crypto.createDecipheriv(
//             this.algorithm,
//             this.key,
//             Buffer.from(iv, "hex")
//         );
//         return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
//     }
// }
// const encrypter = new Encrypter("syndicate_robotics_123");

// const clearText = "123";
// const encrypted = encrypter.encrypt(clearText);
// console.log('1 ' + encrypted)
// const dencrypted = encrypter.dencrypt(encrypted);
// console.log('2 ' + clearText);
// console.log('3 ' + dencrypted);

// const Connection = require('./Server/models/Connections');
const Pl = require('./Server/models/Pl');
const Jook = require('./Server/models/Jook');
// const Message = require('./Server/models/Messages');
//const Message = require('./Server/models/Messages');

const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();

// const session = require('express-session');
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true,  sameSite: 'None' }
// }))


// var cookieSession = require("cookie-session");
// app.set('trust proxy', 1)
// app.use(
//     cookieSession({
//         name: "__session",
//         keys: ["key1"],
//         maxAge: 24 * 60 * 60 * 100,
//         secure: true,
//         httpOnly: true,
//         sameSite: 'none'
//     })
// );

const WebSocketServer = require('ws').Server;
//const WebSocket = require('ws');

require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
// const fileUpload = require('express-fileupload')
// const router = require('./routes/index')
// const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const path = require('path')


app.use(cors())
//app.use(errorHandler)
app.use(express.json({extended: true}))
app.use(express.static(path.resolve(__dirname, 'static')))
//app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileUpload({}))
// app.use('/api', router)

const privateKey = fs.readFileSync(path.resolve(__dirname, './cert/serbotonline/privkey.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname, './cert/serbotonline/cert.pem'));
const ca = fs.readFileSync(path.resolve(__dirname, './cert/serbotonline/chain.pem'));

util = require('util');
var filepath = path.join(__dirname, './public/1.mp3');
app.get('/1.mp3', function (req, res) {
    res.set({'Content-Type': 'audio/mpeg'});
    var readStream = fs.createReadStream(filepath);
    readStream.pipe(res);
})

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.use((req, res) => {
    res.send('Hello there !');
});


// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
//const httpsServerIO = https.createServer(credentials, app);
//const WebSocket = require('ws');
//global.arduino = {};


const start = async () => {

    try {
        await mongoose.connect(process.env.DATABASE_URL)
            .then(() => console.log("Successfully connect to MongoDB."))
            .catch(err => console.error("Connection error", err));

        const wsa = new WebSocketServer({server: httpServer});
        wsa.on('connection', ws => {

            // ws.isAlive = true;
            // ws.on('pong', heartbeat);

            //global.wsg = ws
            ws.send('connected WS server')
            ws.on('message', msgg => {
                msg = JSON.parse(msgg)
                switch (msg.method) {

                    case "connection":
                        // const dencrypted = encrypter.dencrypt(msg.id);
                        // wsg.id = dencrypted
                        console.log(msg.connected + ' connected ' + msg.id + ' ' )
                        ws.id = msg.id
                        break;

                    // case "messages":
                    //     console.log('Arduino '+ msg.id + '|' + msg.messageL + '|' + msg.messageR)
                    //     break;
                    //
                    // case "messagesFBLR":
                    //     let mess6 = JSON.stringify({
                    //         method: 'messagesFBLR',
                    //         messageFBL: msg.messageFBL,
                    //         messageFBR: msg.messageFBR,
                    //     })
                    //     console.log('From arduino messageFBL '+ 'id ' + msg.id + ' messageFBL ' + msg.messageFBL)
                    //     console.log('From arduino messageFBR '+ 'id ' + msg.id + ' messageFBR ' + msg.messageFBR)
                    //     wssSend(mess6, ws)
                    //     break;


                    // case "messagesLTRT":
                    //     console.log('messageRT ' + 'id ' + msg.id + " " + msg.messageRT + " " + msg.messageLT)
                    //     break;

                    case "testFromArduino":
                        console.log('Frontend --> Server --> Arduino --> Server ' + ' id: ' + msg.id + " OnOff: " + msg.messageOnOff)
                        break;

                    case "messagesOnOff":
                        // let mess8 = JSON.stringify({
                        //     method: 'messagesOnOff',
                        //     messageOnOff: msg.messageOnOff,
                        // })
                        console.log(msg.id + ' Frontend --> Server  OnOff: ' + msg.messageOnOff)

                        //to Arduino
                        let mess11 = JSON.stringify({
                            method: 'test',
                            id : msg.id,
                            messageOnOff: msg.messageOnOff,
                        })

                        //wssSend(mess8, ws)
                        wsaSend(mess11, ws)

                        break;

                    case 'connectByte':
                        //console.log('id ' + msg.id + ' connectByte ' + msg.connectByte)
                        let mess12 = JSON.stringify({
                            method: 'connectByte',
                            connectByte: msg.connectByte,
                        })
                        wsaSend(mess12, ws)
                        break;

                    // case 'arduino':
                    //     console.log('id ' + msg.id + ' ' + msg.txt + ' OnOff ' + msg.messageOnOff)
                    //     break;

                    //    break;
                    default:
                    //console.log('default')
                        wsaSend(msgg, ws)
                }

            })

        })

        // function heartbeat() {
        //     this.isAlive = true;
        // }
        //
        // const interval = setInterval(function ping() {
        //     wsa.clients.forEach(function each(ws) {
        //         if (ws.isAlive === false) return ws.terminate();
        //         ws.isAlive = false;
        //         ws.ping();
        //         console.log('Arduino client.id ' + ws.id + ' OPEN ')
        //     });
        // }, 5000);

        // wsa.on('close', function close() {
        //     clearInterval(interval);
        // });

        const wss = new WebSocketServer({server: httpsServer});
        wss.on('connection', ws => {
            ws.on('message', async msgg => {
                try {
                    msg = JSON.parse(msgg)
                    switch (msg.method) {
                        case "connection":
                            console.log('Connected Chrome id ' + msg.id)
                            console.log('persId ' + msg.persId)
                            ws.id = msg.id
                            ws.persId = msg.persId
                            wss.clients.forEach(function each(client) {
                                console.log('client.id connection Chrome ' + client.id)
                            });
                            wsa.clients.forEach(function each(client) {
                                console.log('client.id connection arduino ' + client.id)
                            });
                            const mess = JSON.stringify({
                                method: 'connection',
                                id: msg.id,
                                persId: msg.persId
                            })
                            wssSend(mess, ws)

                            await Pl.find({socketId: msg.id}).then(pl => {
                                wssSendPersIdOne(JSON.stringify({
                                    method: 'mongoMusicToClient',
                                    message: pl
                                }), ws)
                            })

                            await Jook.find({socketId: msg.id}).then(jook => {
                                wssSendPersIdOne(JSON.stringify({
                                    method: 'mongoJookToClient',
                                    message: jook
                                }), ws)
                            })
                            break;

                        case "mongoMusic":
                            const pl = new Pl({link: msg.link, name: msg.name, pl: msg.pl, socketId: ws.id});
                            await pl.save();
                            await Pl.find({socketId: msg.id}).then(pl => {
                                wssSendPersIdOne(JSON.stringify({
                                    method: 'mongoMusicToClient',
                                    message: pl
                                }), ws)
                            })
                            break

                        case "mongoMusicPl":
                            await Pl.find({socketId: msg.id, pl: msg.message}).then(pl => {
                                wssSendPersIdOne(JSON.stringify({
                                    method: 'mongoMusicToClient',
                                    message: pl
                                }), ws)
                            })
                            break
                        case "mongoMusicDel":
                            await Pl.remove({"_id": msg.message});
                            await Pl.find({socketId: msg.id}).then(pl => {
                                wssSendPersIdOne(JSON.stringify({
                                    method: 'mongoMusicToClient',
                                    message: pl
                                }), ws)
                            })
                            break

                        case "mongoJook":
                            console.log(msg.txtJook + msg.name + msg.pl + ws.id)
                            const jook = new Jook({txtJook: msg.txtJook, name: msg.name, pl: msg.pl, socketId: ws.id});

                            await jook.save();

                            await Jook.find({socketId: msg.id}).then(pl => {
                                wssSendPersIdOne(JSON.stringify({
                                    method: 'mongoJookToClient',
                                    message: pl
                                }), ws)
                            })
                            break

                        case "mongoJookDel":
                            await Jook.remove({"_id": msg.message});
                            await Jook.find({socketId: msg.id}).then(jook => {
                                wssSendPersIdOne(JSON.stringify({
                                    method: 'mongoJookToClient',
                                    message: jook
                                }), ws)
                            })
                            break

                        // case "mongoMusicToClient":
                        //     await Pl.find().then(pl => {
                        //         // console.log(pl)
                        //         wssSend(JSON.stringify({
                        //                 method: 'mongoMusicToClient',
                        //                 message: pl
                        //         }), ws)
                        //     })
                        //     break


                        // case "audioURL":
                        //     const message = new Message({user : '111', messages: msg.message});
                        //     await message.save();
                        //     // const connection = new Connection({ user: msg.username});
                        //     // await connection.save();
                        //     //await this.messages(aWss)
                        //     break

                        // case "messagesL":
                        //     console.log('Chrome messagesL ' + msg.id + ' | R: ' + msg.messageR + ' | L: ' + msg.messageL + ' | ' + " method " + msg.method)
                        //     wsaSend(msgg, ws)
                        //     break;
                        // case "messagesR":
                        //     console.log('Chrome messagesR ' + msg.id + ' | R: ' + msg.messageR + ' | L: ' + msg.messageL + ' | ' + " method " + msg.method)
                        //     wsaSend(msgg, ws)
                        //     break;
                        // case "messagesOnOff":
                        //     console.log('Chrome messageOnOff ' + msg.messageOnOff + ' id ' + msg.id)
                        //     wsaSend(msgg, ws)
                        //     break;
                        // case "messagesStop":
                        //     console.log('Chrome messageStop ' + 'id ' + msg.id)
                        //     wsaSend(msgg, ws)
                        //     break;
                        // case "messagesFBLR":
                        //     console.log('Chrome messageFBLR ' + 'id ' + msg.id)
                        //     wsaSend(msgg, ws)
                        //     break;
                        // case "textSpeak":
                        //     console.log('Chrome textSpeak ' + 'text ' + msg.text + ' : ' + msg.meSend)
                        //     let mess1 = JSON.stringify({
                        //         method: 'textSpeak',
                        //         text: msg.text,
                        //     })
                        //     if (msg.meSend === false) {
                        //         wssSendPersId(mess1, ws)
                        //     } else {
                        //         wssSend(mess1, ws)
                        //     }
                        //     break;
                        // case "noSpeech":
                        //     let mess2 = JSON.stringify({
                        //         method: 'noSpeech',
                        //         message: msg.message,
                        //     })
                        //     wssSendPersId(mess2, ws)
                        //     break;
                        // case "audioURL":
                        //     if (msg.me === false) {
                        //        wssSend(JSON.stringify(msg), ws)
                        //     } else {
                        //         wssSendPersId(JSON.stringify(msg), ws)
                        //     }
                        //     break;
                        // case "audioURLto":
                        //     let mess6 = JSON.stringify({
                        //         method: 'audioURLto',
                        //     })
                        //     if (msg.me === false) {
                        //         wssSendPersId(mess6, ws)
                        //     } else {
                        //         wssSend(mess6, ws)
                        //     }
                        //     break;
                        default:
                            // console.log('default method: ' + msg.method + ' message: ' + msg.message)

                            if (msg.meSend === false && msg.meSend !== undefined) {
                                wssSendPersId(JSON.stringify(msg), ws)
                                // console.log('message: ' + msg.message)
                            } else if (msg.meSend === true && msg.meSend !== undefined) {
                                wssSend(JSON.stringify(msg), ws)
                                // console.log('message: ' + msg.message)
                            } else {
                                wsaSend(msgg, ws)
                                console.log(msg)
                            }
                            break;
                    }
                } catch (e) {
                    console.log(e)
                    // wssSend(msgg, ws)
                    // var buf = new Uint8Array(msgg).buffer
                    // console.log(buf)
                }


                //wsaSend(msgg, ws)
            })
        })

        const wsaSend = (mess, ws) => {
            wsa.clients.forEach(function each(client) {
                //console.log('client.id ' + client.id + ' ws.id  ' + ws.id );
                if (client.id === ws.id && client.readyState === client.OPEN) {
                    client.send(mess)
                }
            });
        }

        const wssSendPersIdOne = (mess, ws) => {
            wss.clients.forEach(function each(client) {
                if (client.persId === ws.persId && client.readyState === client.OPEN) {
                    client.send(mess)
                }
            });
        }

        const wssSendPersId = (mess, ws) => {
            wss.clients.forEach(function each(client) {
                if (client.id === ws.id && client.persId !== ws.persId && client.readyState === client.OPEN) {
                    //if (client.id === ws.id && client.readyState === client.OPEN) {
                    client.send(mess)
                }
            });
        }

        const wssSend = (mess, ws) => {
            wss.clients.forEach(function each(client) {
                if (client.id === ws.id && client.readyState === client.OPEN) {
                    client.send(mess)
                }
            });
        }

        httpServer.listen(8081, () => {
            console.log('HTTP Server running on port 8081');
        });
        httpsServer.listen(4443, () => {
            console.log('HTTPS Server running on port 4443');
        });

    } catch (e) {
        console.log(e)
    }
}

start()
