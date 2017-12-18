

// //calls function to display all users already connected
// initDataReceived();

// function initDataReceived() {
//     var newRow;
//     var cells = []; //0 - usrName, 1 - gender, 2 - IP, 3 - colorChoice, 4 - colorClass, 5 - time, 
//     var userDataTable = document.getElementById('userDataTable');

//     displayHeaders(userDataTable);

//     for(var i = 0; i < usrNames.length; i ++) {
//         newRow = userDataTable.insertRow(1); // adds new row at top of table just bellow headers. means in reversed order of array

//         for (var j = 0; j < 6; j++) { cells[j] = newRow.insertCell(j); } // adds 6 new cells to the new row for each field

//         addCellData(usrNames[i], colors[i], cells[0]);
//         addCellData(gender[i], colors[i], cells[1])
//         addCellData(IPs[i], colors[i], cells[2]);
//         addCellData(colors[i], colors[i], cells[3]);
//         addCellData(colorClass[i], colors[i], cells[4]);
//         addCellData(submitTime[i], colors[i], cells[5]);
//     }
// }

// //displays the names of each field at the top 
// function displayHeaders(userDataTable) {
//     var newRow = userDataTable.insertRow(0);
//     var white = 'rgb(255,255,255)';
//     var cells = [];

//     for (var i = 0; i < 6; i++) { cells[i] = newRow.insertCell(i); } // adds 6 new cells to the new row for each field header

//     addHeaderCellData('Username', white, cells[0]);
//     addHeaderCellData('Gender', white, cells[1]);
//     addHeaderCellData('IP', white, cells[2]);
//     addHeaderCellData('Color Choice', white, cells[3]);
//     addHeaderCellData('Color Class', white, cells[4]);
//     addHeaderCellData('Recieve Time', white, cells[5]);
// }

// function addCellData(text, color, cell) {
//     var tempText;

//     if(text == '') { text = '-----'; } //if empty then 5 dashes (could casue confusin with Usrname)
//     if(color == '') { color = 'rgb(255,255,255)'; } //if color empty then white (against black background)

//     tempText = document.createElement('p'); //creates a p tag (stores text)
//     tempText.textContent = text;            //sets the p tags text to whatever was passed in
//     tempText.style.color = color;           //sets the text color of the p tag to whatever the user chose
//     tempText.style.fontSize = '16px';       //sets the font size
//     tempText.style.fontWeight = 900;        //sets the width to max (easier to see color)
//     cell.appendChild(tempText);             //adds the p tag ot the cell which was passed in
// }

// function addHeaderCellData(text, color, cell) {
//     var tempText;

//     tempText = document.createElement('p');
//     tempText.textContent = text;
//     tempText.style.color = color;
//     tempText.style.fontSize = '16px';
//     tempText.style.fontWeight = 900;
//     cell.setAttribute('class', 'headers');
//     cell.appendChild(tempText);
// }



// document.body.style.backgroundColor = 'rgb(0,0,0)';