/*
    TODO : remove display color and replace with degToColor
*/

var wheelCanvas = document.getElementById('wheelCanvas');
var ctx = wheelCanvas.getContext('2d');
var colorCodeRGBOut = document.getElementById('colorCodeRGBOut');
var colorCodeHEXOut = document.getElementById('colorCodeHEXOut');
var currentColor = {
    'r' : 255,
    'g' : 0,
    'b' : 0
};
var degToColor = [];

for (var i = 0; i < 360; i++) {
    ctx.lineWidth = "90";

    ctx.beginPath();
    ctx.arc(150,150,105,(2 * (i - 90)/360)*Math.PI,(2 * (i - 88)/360)*Math.PI); //explaination
    ctx.strokeStyle = 'rgb(' + Math.round(currentColor.r) + ',' + Math.round(currentColor.g) + ',' + Math.round(currentColor.b) + ')';
    ctx.stroke();
    ctx.closePath();

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
    if (theta%45 == (theta%45).toPrescision(0)) {
        currentColor.r=0;
        currentColor.g = 0;
        currentColor.b = 0;
    }
    degToColor[theta] = new Object;
    degToColor[theta].r = currentColor.r;
    degToColor[theta].g = currentColor.g;
    degToColor[theta].b = currentColor.b;
}

function movement (e) {
    var boundRectWheelCanv = wheelCanvas.getBoundingClientRect();
    var x = e.clientX - boundRectWheelCanv.x - boundRectWheelCanv.width / 2;
    var y = e.clientY - boundRectWheelCanv.y - boundRectWheelCanv.height / 2;
    var angleToQuadLine = getAngleToQuadLine(x,y)
    var absoluteAngle = applyCASTOffset(x,y,angleToQuadLine);
    
    var colRgb = [];
    colRgb[0] = Math.round(degToColor[Math.round(absoluteAngle)].r);
    colRgb[1] = Math.round(degToColor[Math.round(absoluteAngle)].g);
    colRgb[2] = Math.round(degToColor[Math.round(absoluteAngle)].b);
    
    var colHex = [];
    colHex[0] = colRgb[0].toString(16);
    colHex[1] = colRgb[1].toString(16);
    colHex[2] = colRgb[2].toString(16);

    for(var i = 0; i < colHex.length; i++) {
        if(colHex[i].length < 2) {
            colHex[i] = "0" + colHex[i] //#00 FF 0D e.g.
        }
    }

    var colorCodeRGB = 'rgb(' + colRgb[0] + ',' + colRgb[1] + ',' + colRgb[2] + ')';
    var colorCodeHEX = "#" + colHex[0] + colHex[1] + colHex[2];

    document.getElementById("bod").style.backgroundColor = colorCodeRGB;
    colorCodeRGBOut.innerHTML = colorCodeRGB;
    colorCodeHEXOut.innerHTML = colorCodeHEX;
}

function getAngleToQuadLine(x,y) {
    var deltaX = Math.abs(x);
    var deltaY = Math.abs(y);

    return Math.atan(deltaY/deltaX) / (2*Math.PI) * 360;
}

function applyCASTOffset(x,y,thetaToQuadLine) {
    if (x > 0 && y < 0) {
        //top right quadrant
        return 0 + (90 - thetaToQuadLine);
    } else if (x > 0 && y > 0) {
        //bottom right quadrant
        return 90 + thetaToQuadLine;
    } else if (x < 0 && y > 0) {
        //bottom left quadrant
        return 180 + (90 - thetaToQuadLine);
    } else {
        //top left quadrant
        return 270 + thetaToQuadLine;
    }
}