var bodyParser = require('body-parser');
var express = require('express');
var ip = require('ip');
var app = express();
var Server = require('http').Server(app);
var io = require('socket.io')(Server);
var port = 8080;
var serverIP = ip.address().toString();
var publicDir = __dirname + '/public';

//express configuration
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(publicDir));

app.get('/', function(req, res){
    res.sendFile(publicDir + '/dash.html');
});

Server.listen(port, '0.0.0.0');
console.log('server online at\thttp://' + serverIP + ':' + port);

var dashConnect = io.of('/colorConnect');
var users = 0;

dashConnect.on('connect', function(socket){
    users++;
    console.log('someone connected');

    dashConnect.emit('nUsers', {nUsers: users});

    socket.on('hiFromCli', function(data) {
        console.log("mkaaay");
        console.log(data.colorChoice)
    });
});
