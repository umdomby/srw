const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const path = require('path')

const privateKey = fs.readFileSync(path.resolve(__dirname,'./cert/servicerobotpro/privkey.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname,'./cert/servicerobotpro/cert.pem'));
const ca = fs.readFileSync(path.resolve(__dirname,'./cert/servicerobotpro/chain.pem'));

// const privateKey = fs.readFileSync(path.resolve(__dirname,'./cert/umdomby/privkey.pem'));
// const certificate = fs.readFileSync(path.resolve(__dirname,'./cert/umdomby/cert.pem'));
// const ca = fs.readFileSync(path.resolve(__dirname,'./cert/umdomby/chain.pem'));

const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

//const httpServer = http.createServer(app);

http.createServer(function(req, res) {
    res.writeHead(301, {
        //Location: "https://www." + req.headers["host"].replace("www.", "") + req.url
        Location: 'https://' + req.headers.host + req.url
    });
    res.end();
}).listen(80);

const httpsServer = https.createServer(credentials, app);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// httpServer.listen(8080, () => {
//     console.log('HTTP Server running on port 8080');
// });
// httpsServer.listen(3000, () => {
//     console.log('HTTPS Server running on port 3000');
// });



// httpServer.listen(80, () => {
//     console.log('HTTP Server running on port 80');
// });

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

