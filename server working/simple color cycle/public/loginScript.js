var genderNull;
var usernameNull;

function checkForm() {
    var username = document.getElementById("usernameEntry").value;
    var genderBtns = document.getElementsByName("gender");
    var selectedGender;
     genderNull = true;
     usernameNull = true;

    var counter = 0;
    while(genderNull && counter < genderBtns.length) {
        if(genderBtns[counter].checked) { 
            selectedGender = genderBtns[counter].value; 
            genderNull = false;
        }
        counter++;
    }

    //problem when users try to break server (they will ... they always do >:|  ))
    if(username.length != 0) { usernameNull = false; } //could cause problems for white space usernames or really long ones (add later) //not working

    if(usernameNull) {
        document.getElementById("usernameHead").style.color = 'rgb(255,0,0)';
        alert("you must enter a username")
    } else {
        document.getElementById("usernameHead").style.color = 'rgb(0,0,0)';
    }

    if(genderNull) {
        document.getElementById("genderHead").style.color = 'rgb(255,0,0)';
        alert("you must select a gender")
    } else {
        document.getElementById("genderHead").style.color = 'rgb(0,0,0)';
    }

    if(usernameNull || genderNull) { return false; } 
    else { return true; }
}