//dev + test data

var users = []

//calls function to display all users already connected
// initDataReceived();

function initDataReceived(usersdat) {
    console.log(usersdat.usersFromServer);
    document.body.style.backgroundColor = 'rgb(0,0,0)';
    users = usersdat.usersFromServer;
    var newRow;
    var cells = []; //0 - usrName, 1 - gender, 2 - IP, 3 - colorChoice, 4 - colorClass, 5 - time, WRONG
    var userDataTable = document.getElementById('userDataTable');

    displayHeaders(userDataTable);

    for(var i = 0; i < users.length; i ++) {
        newRow = userDataTable.insertRow(1); // adds new row at top of table just bellow headers. means in reversed order of array

        for (var j = 0; j < 7; j++) { cells[j] = newRow.insertCell(j); } // adds 6 new cells to the new row for each field

        addCellData(users[i].userName, users[i].colorChoiceRGB, cells[0]);
        addCellData(users[i].gender, users[i].colorChoiceRGB, cells[1])
        addCellData(users[i].colorChoiceRGB, users[i].colorChoiceRGB, cells[2]);
        addCellData(users[i].colorChoiceHEX, users[i].colorChoiceRGB, cells[3]);
        addCellData(users[i].colorWheelAngle, users[i].colorChoiceRGB, cells[4]);
        addCellData(users[i].colorSubmitTime, users[i].colorChoiceRGB, cells[5]);
        addCellData(users[i].IP, users[i].colorChoiceRGB, cells[6]);
        
        // addCellData(colors[i], colors[i], cells[3]);
        // addCellData(colorClass[i], colors[i], cells[4]);
        // addCellData(submitTime[i], colors[i], cells[5]);
    }
    console.log("initdata");
}

function singleUserLoginDataRecieved(userdat) {
    users.push(userdat.loginData);
    var userDataTable = document.getElementById('userDataTable');
    var newRow;
    newRow = userDataTable.insertRow(1); // adds new row at top of table just bellow headers. means in reversed order of array
    var cells = []; //0 - usrName, 1 - gender, 2 - IP, 3 - colorChoice, 4 - colorClass, 5 - time,  WRONG
    for (var j = 0; j < 7; j++) { cells[j] = newRow.insertCell(j); }

    addCellData(users[users.length - 1].userName, users[users.length - 1].colorChoiceRGB, cells[0]);
    addCellData(users[users.length - 1].gender, users[users.length - 1].colorChoiceRGB, cells[1])
    addCellData('-----', users[users.length - 1].colorChoiceRGB, cells[2]);
    addCellData('-----', users[users.length - 1].colorChoiceRGB, cells[3]);
    addCellData('-----', users[users.length - 1].colorChoiceRGB, row.cells[4]);
    addCellData('-----', users[users.length - 1].colorChoiceRGB, cells[5]);
    addCellData(users[users.length - 1].IP, users[users.length - 1].colorChoiceRGB, cells[6]);

}

function colorChoiceRecieved(colorChoiceData) {
    //could be replaced wit a single line
    users[colorChoiceData.UID].colorChoiceRGB = colorChoiceData.colorChoiceRGB;
    users[colorChoiceData.UID].colorChoiceHEX = colorChoiceData.colorChoiceHEX;
    users[colorChoiceData.UID].colorSubmitTime = colorChoiceData.colorSubmitTime;
    users[colorChoiceData.UID].colorWheelAngle = colorChoiceData.colorWheelAngle;

    var row = document.getElementById('userDataTable').rows[(users.length) - colorChoiceData.UID];

    //pretty inefficient could be in one line also
    addCellData(users[colorChoiceData.UID].userName, users[colorChoiceData.UID].colorChoiceRGB, row.cells[0]);
    addCellData(users[colorChoiceData.UID].gender, users[colorChoiceData.UID].colorChoiceRGB, row.cells[1])
    addCellData(colorChoiceData.colorChoiceRGB, colorChoiceData.colorChoiceRGB, row.cells[2]);
    addCellData(colorChoiceData.colorChoiceHEX, colorChoiceData.colorChoiceRGB, row.cells[3]);
    addCellData(users[colorChoiceData.UID].colorWheelAngle, users[colorChoiceData.UID].colorChoiceRGB, row.cells[4]); //to be replaced with class
    addCellData(colorChoiceData.colorSubmitTime, colorChoiceData.colorChoiceRGB, row.cells[5]);
    addCellData(users[colorChoiceData.UID].IP, users[colorChoiceData.UID].colorChoiceRGB, row.cells[6]);
   

    applyColorToOtherCells(colorChoiceData.colorChoiceRGB, row);

    // for(var i = 0; i < row.cells.length; i++) { row.cells[i].style.color = colorChoiceData.colorChoiceRGB; }
}

//displays the names of each field at the top 
function displayHeaders(userDataTable) {
    var newRow = userDataTable.insertRow(0);
    var white = 'rgb(255,255,255)';
    var cells = [];

    for (var i = 0; i < 7; i++) { cells[i] = newRow.insertCell(i); } // adds 6 new cells to the new row for each field header

    addHeaderCellData('Username', white, cells[0]);
    addHeaderCellData('Gender', white, cells[1]);
    addHeaderCellData('Color (RGB)', white, cells[2]);
    addHeaderCellData('Color (HEX)', white, cells[3]);
    addHeaderCellData('color class', white, cells[4]);
    addHeaderCellData('color submit time', white, cells[5]);
    addHeaderCellData('user IP', white, cells[6]);
    // addHeaderCellData('IP', white, cells[2]);
    // addHeaderCellData('Color Choice', white, cells[3]);
    // addHeaderCellData('Color Class', white, cells[4]);
    // addHeaderCellData('Recieve Time', white, cells[5]);
}

function addCellData(text, color, cell) {
    var tempText;
    cell.innerHTML = ""; //clears cell

    if(text == '') { text = '-----'; } //if empty then 5 dashes (could casue confusion with Usrname)
    if(color == '-----') { color = 'rgb(255,255,255)'; } //if color empty then white (against black background)

    tempText = document.createElement('p'); //creates a p tag (stores text)
    tempText.textContent = text;            //sets the p tags text to whatever was passed in
    tempText.style.color = color;           //sets the text color of the p tag to whatever the user chose
    tempText.style.fontSize = '16px';       //sets the font size
    tempText.style.fontWeight = 900;        //sets the width to max (easier to see color)
    cell.appendChild(tempText);             //adds the p tag ot the cell which was passed in
}

function addHeaderCellData(text, color, cell) {
    var tempText;

    tempText = document.createElement('p');
    tempText.textContent = text;
    tempText.style.color = color;
    tempText.style.fontSize = '16px';
    tempText.style.fontWeight = 900;
    cell.setAttribute('class', 'headers');
    cell.appendChild(tempText);
}

function applyColorToOtherCells(color, row) {
    row.style.color = color;
}