//imports
var webServModule = require('./webServer.js');

//starts up webserver module
webServModule.startup();

//TODO : export into a seperate module
var users = []; /*user id is given by index 
(possible issue as will change on pop)*/

//when a login form is submited
webServModule.getApp().post('/login', function(req, res) {
    var usernameInput = req.body.username;
    var genderInput = req.body.gender;
    
    if(usrNameUnique(usernameInput)) {
        newUser(usernameInput, genderInput);
        sendNewUserToDash(usernameInput, genderInput, users.length);
        webServModule.sendPage("colorSelectorWheel.html", res);
    } else {
        console.log("ERROR! user name (\"" + usernameInput + "\") already exists");
        webServModule.sendPage("loginUNameTaken.html", res); //ok this is some really janky assed shit right here ... fix it ASAP!
    }
});

//m8. fkin srsly!?!
webServModule.getApp().post('/shutdown', function(req, res) {
    process.exit();
});

//legacy dash
webServModule.getApp().get('/legacyDash', function(req, res) {
    webServModule.sendPage('alphaDash2.html', res);
    sendInitUserDataToDash();
    console.log("test");
});

webServModule.listenForColorChoice();

function newUser(userName, userGender) {
    var tempUserData = new Object();
    tempUserData.userName = userName;
    tempUserData.gender = userGender;

    users.push(tempUserData);
    console.log("\nnew user");
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

// //tells dash when user logs in and chooses a color
function sendNewUserToDash() {
    webServModule.getSockIO().sockets.emit('initUserData', {description: users});
}

function sendInitUserDataToDash() {
    
}

webServModule.getSockIO().on('dashConnected', function() {
    webServModule.getSockIO().sockets.emit('initUserData', {description: users});
})

// webServModule.getSockIO.on('connect' function)