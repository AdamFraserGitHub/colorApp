//imports
var bodyParser = require('body-parser');
var express = require('express');
var ip = require('ip');

//shorthands
var app = express();

//server hosting variables
var port = 8080;
var serverAddr = ip.address().toString();

//file system variables
var publicDir = __dirname + '/public';

//TODO : export into a seperate module
var users = []; /*user id is given by index 
(possible issue as will change on pop)*/


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

//when a login form is submited
app.post('/login', function(req, res) {
    var usernameInput = req.body.username;
    var genderInput = req.body.gender;
    
    if(usrNameUnique(usernameInput)) {
        newUser(usernameInput, genderInput);
        sendPage("colorSelectorWheel.html", res);
    } else {
        console.log("ERROR! user name (\"" + usernameInput + "\") already exists");
        sendPage("loginUNameTaken.html", res); //ok this is some really janky assed shit right here ... fix it ASAP!
    }
})

//run server on http://IP:port/
app.listen(port, '0.0.0.0');
console.log("server online at http://" + serverAddr + ":" + port);

function newUser(userName, userGender) {
    var tempUserData = new Object();
    tempUserData.userName = userName;
    tempUserData.gender = userGender;

    users.push(tempUserData);
    console.log("new user\n=========\nname: " + tempUserData.userName + "\ngender: " + tempUserData.gender + "\n\n\n");
}

//checks that the username passes into it is not already in use
//PROBLEMS : inneficient (e.g. if first char doesnt match no need to check rest)
//           puts possibly unnecisary load on server and connection to client 
//           should be moved to client side at later date
function usrNameUnique(usernameInput) {
    var unique = true;
    var counter = 0;
    while(unique && counter < users.length){
        if(usernameInput == users[counter].userName){ unique = false; }
        counter++;
    }
   return unique;
}

//to be exported
//could be merged with others into one function (i.e. dont need path if can get from req... ooooooh)
//sends a page to the client that they have not requested
function sendPage (relPagePath, res) {
    res.sendFile(publicDir + '/' + relPagePath);
}