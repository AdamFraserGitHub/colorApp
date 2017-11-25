var wheelCanvas = document.getElementById('wheelCanvas');
var ctx = wheelCanvas.getContext('2d');
var displayColor;

// function run(i) {
for(var i = 0; i < 361; i++) {
    ctx.beginPath();
        displayColor = colorSelector(i);
        ctx.arc(150,150,115,(2 * (i - 90)/360)*Math.PI,(2 * (i - 89)/360)*Math.PI);
        // currentColor = colorSelector(i);
        ctx.strokeStyle = 'rgb(' + displayColor.r + ',' + displayColor.g + ',' + displayColor.b + ')';
        ctx.lineWidth = "70";
        ctx.stroke();

        console.log("Theta: " + i + "    b: " + colorSelector(i).b);
    ctx.closePath();
}

function colorSelector (theta) {
    var color = new Object;
    color.r = 0;
    color.g = 0;
    color.b = 0;

    if(theta <= 60 || theta > 300) {
        color.r = 255;
    }

    if(theta >= 60 && theta <= 180) {
        color.g = 255
    }


    //Promicing
    if(theta >= 180 && theta <= 300) {
        color.b = 255;
    } else {
        if(theta < 240){
            color.b = Math.round(map((Math.abs(theta + 60 - 240)), 0, 60, 255, 0));
        } else{
            color.b = Math.round(map((Math.abs(theta - 60 - 240)), 0, 60, 255, 0));
        }
        console.log("theta2: " + theta + "    b: " + color.b);
    }

    return color;
}

function map(value,inputFloor,inputCeil,outputFloor,outputCiel) {
    var valueMapIn, valueMapOut;
    valueMapIn = (value - inputFloor) / (inputCeil - inputFloor);
    valueMapOut = valueMapIn * (outputCiel - outputFloor) + outputFloor;

    return valueMapOut;
}