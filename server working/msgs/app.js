var express = require('express')
var http = require('http'), path = require('path');
var app = express();
var bodyParser = require('body-parser');

var color = {
    'r' : 255,
    'g' : 0
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
/*JS client side files has to be placed under a folder by name 'public' */
/*to access the posted data from client using request bpdy*/
app.post('/post', function (req, res) {
    /* Handling the AngularJS post request*/
    console.log(req.host);
    if(req.body.command == "gPlus") {
        color.g+=5;
    }
    res.setHeader('Content-Type', 'application/json');
    /*response has to be in the form of a JSON*/
    // req.body.serverMessage = "NodeJS replying to angular"
        /*adding a new field to send it to the angular Client */
    res.end(color.toString());
    /*Sending the respone back to the angular Client */
});



http.createServer(app).listen(3000, '0.0.0.0',function () {
    console.log("Express server listening on port 3000");
});
