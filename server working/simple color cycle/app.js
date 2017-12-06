var express = require('express'),
ip = require('ip');
app = express(),
port = 8080;
ip = ip.address().toString();

var bodyParser = require('body-parser');
var publicDir = __dirname + '/public';

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(publicDir));

app.get('/', function(req, res){
    res.sendFile(publicDir + '/login.html');
});

app.post('/login', function(req, res) {
    newUser(req.body.username, req.body.gender);
})

app.listen(port, ip);


//to be exported into a seperate module
var users = [];

function newUser(userName, userGender) {
    var tempUserData = new Object();
    tempUserData.userName = userName;
    tempUserData.gender = userGender;

    users.push(tempUserData);
}