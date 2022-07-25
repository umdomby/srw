var subdomain = require('express-subdomain');
var express = require('express');
var app = express();
var router = express.Router();

app.get('/', function(req, res) {
    res.send('Homepage');
});

//api specific routes
router.get('/', function(req, res) {
    res.send('Welcome to our API!');
});

router.get('/users', function(req, res) {
    res.json([
        { name: "Brian" }
    ]);
});

app.use(subdomain('api', router));
app.listen(80);
