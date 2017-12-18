//imports
var bodyParser = require('body-parser');
var express = require('express');
var ip = require('ip');

//shorthands
var app = express();

var Server = require('http').Server(app);
var io = require('socket.io')(Server);

//server hosting variables
var port = 8080;
var serverIP = ip.address().toString();

//file system variables
var publicDir = __dirname + '/public'; //needs to work for modules folder i.e. ../publicDir

//express configuration
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(publicDir));

/*
when a general request is made not for a specific page 
send the login page
*/
app.get('/', function(req, res){
    res.sendFile(publicDir + '/login.html');
});

exports.listenForColorChoice = function() {
    app.post('/colorChoice', function(req, res) {
        console.log(req.body);
    });
}

//callable functions
exports.startup = function () {
    Server.listen(port, '0.0.0.0');

    console.log("\n\n\n");
    console.log("   _____      _                                          _____  ");
    console.log("  / ____|    | |                /\\                   _  |  __ \\ ");
    console.log(" | |     ___ | | ___  _ __     /  \\   _ __  _ __    (_) | |  | |");
    console.log(" | |    / _ \\| |/ _ \\| '__|   / /\\ \\ | '_ \\| '_ \\       | |  | |");
    console.log(" | |___| (_) | | (_) | |     / ____ \\| |_) | |_) |   _  | |__| |");
    console.log("  \\_____\\___/|_|\\___/|_|    /_/    \\_\\ .__/| .__/   (_) |_____/ ");
    console.log("                                     | |   | |                  ");
    console.log("                                     |_|   |_|        ");
    console.log("\n");

    console.log("server online at http://" + serverIP + ":" + port);
}

exports.getSrvAddr = function() {
    var srvAddr = [serverIP, port];
    return srvAddr;
}

exports.getApp = function() {
    return app;
}

exports.getSockIO = function() {
    return io;
}

//could be merged with others into one function (i.e. dont need path if can get from req... ooooooh)
//sends a page to the client that they have not requested
exports.sendPage = function(pathFromPublicDir, res) {
    res.sendFile(publicDir + '/' + pathFromPublicDir);
}