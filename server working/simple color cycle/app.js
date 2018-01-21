//imports
var webServModule = require('./webServer.js');
var fs = require('fs');

//starts up webserver module
webServModule.startup();

//TODO : export into a seperate module
var users = []; /*user id is given by index 
(possible issue as will change on pop)*/

//when a login form is submited
webServModule.getApp().post('/login', function(req, res) {
    var usernameInput = req.body.username;
    var genderInput = req.body.gender;
    var userIP = req.connection.remoteAddress;


    if(usrNameUnique(usernameInput)) {
        userLogin(usernameInput, genderInput, userIP);
        sendNewLogin(usernameInput, genderInput, users.length);
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
    // sendInitUserDataToDash();
    console.log("test");
});

// webServModule.listenForColorChoice();

function userLogin(userName, userGender, userIP) {
    var tempUserData = new Object();
    tempUserData.userName = userName;
    tempUserData.gender = userGender;
    tempUserData.IP = userIP;
    console.log(tempUserData.IP);
    tempUserData.colorChoiceRGB = '-----'; //until choose color (unneccesary load on server)
    tempUserData.colorChoiceHEX = '-----';

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

webServModule.getApp().post('/colorChoice', function(req, res) {
    console.log(req.body);
    // users[?].colorChoice = req.body.colorChoice
});

var dashConnect = webServModule.getSockIO().of('/legacyDashSock');

//tells dash when user logs in and chooses a color
function sendNewLogin() {
    dashConnect.emit('singleUserLoginData', {loginData: users[users.length - 1]});
}

dashConnect.on('connect', function(socket) {
    sendInitUserDataToDash();

    socket.on('shutdown', function() {
        process.exit();
    });

    socket.on('save', function() {
        fs.writeFile(getDateAndTime() + '.csv', generateCSVFromUsers(), 'ascii', null); 
    });
});


function sendInitUserDataToDash() {
    dashConnect.emit('initUserData', {usersFromServer: users});
}

function sendColorChoiceToDash(UID) {
    dashConnect.emit('userColorChoice', {
                                         UID: UID, 
                                         colorChoiceRGB: users[UID].colorChoiceRGB, 
                                         colorChoiceHEX: users[UID].colorChoiceHEX, 
                                         colorSubmitTime: users[UID].colorSubmitTime,
                                         colorWheelAngle: users[UID].colorWheelAngle
                                        });
}

var colorWheelConnect = webServModule.getSockIO().of('/colorConnect');

colorWheelConnect.on('connect', function(socket){
    console.log('a color wheel connected');

    socket.emit('UIDSend', {UID: (users.length - 1)}); //emits on socket and not channel
                                                       //so only sent to client which just connected

    socket.on('colorChoice', function(data) {
        users[data.UID].colorChoiceRGB = data.colorChoiceRGB;
        users[data.UID].colorChoiceHEX = data.colorChoiceHEX;
        users[data.UID].colorWheelAngle = classifyColor(data.colorWheelAngle);

        var dateHandler = new Date();
        var dateString = '';

        if(dateHandler.getHours() < 10) { dateString += '0' + dateHandler.getHours() + ':'; } 
        else { dateString += dateHandler.getHours() + ':'; }

        if(dateHandler.getMinutes() < 10) { dateString += '0' + dateHandler.getMinutes() + ':'; } 
        else { dateString += dateHandler.getMinutes() + ':'; }
        
        if(dateHandler.getSeconds() < 10) { dateString += '0' + dateHandler.getSeconds(); } 
        else { dateString += dateHandler.getSeconds(); }

        users[data.UID].colorSubmitTime = dateString;
        sendColorChoiceToDash(data.UID);
    });
});

function classifyColor(colorWheelAngle, UID) {
    if(colorWheelAngle >= 331 || colorWheelAngle < 25 ) { return 'red'; }              //red
    else if(colorWheelAngle >= 25 && colorWheelAngle < 47 ) { return 'orange'; }       //orange
    else if(colorWheelAngle >= 47 && colorWheelAngle < 72 ) { return 'yellow'; }       //yellow
    else if(colorWheelAngle >= 72 && colorWheelAngle < 155 ) { return 'green'; }       //green
    else if(colorWheelAngle >= 155 && colorWheelAngle < 202 ) { return 'cyan'; }       //cyan
    else if(colorWheelAngle >= 202 && colorWheelAngle < 277 ) { return 'blue'; }       //blue
    else if(colorWheelAngle >= 277 && colorWheelAngle < 295 ) { return 'purple'; }     //purple
    else { return 'pink'; }                                                            //pink
}

function getDateAndTime() {
    var dateAndTime = 'SAVE__';
    var dateObj = new Date();

    dateAndTime += dateObj.getDate() + '-';
    dateAndTime += (dateObj.getMonth() + 1) + '-';
    dateAndTime += (dateObj.getYear() + 1900)+ '__';
    dateAndTime += dateObj.getHours() + '-';
    dateAndTime += dateObj.getMinutes() + '-';
    dateAndTime += dateObj.getSeconds() + '.';
    dateAndTime += dateObj.getMilliseconds();

    return dateAndTime;
}

function generateCSVFromUsers() {
    var tableString = "";

    tableString += "Username,Gender,Color choice (RGB),Color choice (HEX),Color class,Submit time,IP\n" //add headers

    for(var i = 0; i < users.length; i++) {
        tableString += users[i].userName + ',' + users[i].gender + ',' + replaceCommas(users[i].colorChoiceRGB) + ',' + users[i].colorChoiceHEX + ',' + users[i].colorWheelAngle + ',' + users[i].colorSubmitTime + ',' + users[i].IP + '\n';
    }

    return tableString;
}

function replaceCommas(str) {
    var tempStr = str.split(',');

    for(var i = 0; i < tempStr.length - 1; i ++) {
        tempStr[i] += '.';
    }

    return tempStr.join('');
} 