degreesOfColor = [

];

function degToCol(theta) {

}


//stores color being worked on (starts at pure red 0deg)
var currentColor = {
    'r' : 255,
    'g' : 0,
    'b' : 0
};

//generates colors for each degree
for (var i = 0; i < 360; i++) {
    colorChanger(i);
}

function colorChanger(theta) {
    theta = Math.round(theta);

    if(theta >= 0 && theta < 120){
        if(theta >= 60) {
            currentColor.r -= 4.25;
        } else {
            currentColor.g += 4.25;
        }
    }else if(theta >= 120 && theta < 240){
        if(theta >= 180) {
            currentColor.g -= 4.25;
        } else {
            currentColor.b += 4.25;
        }
    } else if(theta >= 240 && theta < 360){
        if(theta >= 300) {
            currentColor.b -= 4.25;
        } else {
            currentColor.r += 4.25;
        }
    }

    degreesOfColor[theta] = new Object;
    degreesOfColor[theta].r = currentColor.r;
    degreesOfColor[theta].g = currentColor.g;
    degreesOfColor[theta].b = currentColor.b;
}