var wheelCanvas = document.getElementById('wheelCanvas');
var ctx = wheelCanvas.getContext('2d');
var displayColor = {
    'r' : 255,
    'g' : 0,
    'b' : 0
};

for(var i = 0; i < 102; i++) {
    ctx.beginPath();
    ctx.rect(i*2,0,2,100);
    ctx.fillStyle = 'rgb(' + displayColor.r + ',' + displayColor.g + ',' + displayColor.b + ')';
    ctx.fill();
    ctx.closePath();
    
    if(i > 50) {
        displayColor.r -= 5;
    } else {
        displayColor.g += 5;
    }
}

for(var i = 102; i < 204; i++) {
    ctx.beginPath();
    ctx.rect(i*2,0,2,100);
    ctx.fillStyle = 'rgb(' + displayColor.r + ',' + displayColor.g + ',' + displayColor.b + ')';
    ctx.fill();
    ctx.closePath();
    
    if(i > 152) {
        displayColor.g -= 5;
    } else {
        displayColor.b += 5;
    }
}

for(var i = 204; i < 306; i++) {
    ctx.beginPath();
    ctx.rect(i*2,0,2,100);
    ctx.fillStyle = 'rgb(' + displayColor.r + ',' + displayColor.g + ',' + displayColor.b + ')';
    ctx.fill();
    ctx.closePath();
    
    if(i > 254) {
        displayColor.b -= 5;
    } else {
        displayColor.r += 5;
    }
}