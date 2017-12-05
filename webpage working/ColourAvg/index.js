var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var fillColor;
var rAvg = 0, gAvg = 0, bAvg = 0;

var colors = hexToColorComponants(["#FF0000", "#00FF00", "#FF0000", "#0000FF", "#00FF00", "FF0000"]);

for(var i = 0; i < colors.length; i ++) {
    rAvg += colors[i].r;
    gAvg += colors[i].g;
    bAvg += colors[i].b;
}

rAvg = Math.round(rAvg / colors.length);
gAvg = Math.round(gAvg / colors.length);
bAvg = Math.round(bAvg / colors.length);

console.log(rAvg + " " + gAvg + " " + bAvg);

fillColor = 'rgb(' + rAvg + ',' + gAvg + ',' + bAvg + ')';
ctx.fillStyle = fillColor;
ctx.rect(0,0,800,400);
ctx.fill();


function hexToColorComponants(hexes) {
    var colorComponants = [];
    for (var i = 0; i < hexes.length; i++) {
        colorComponants[i] = new Object();
        colorComponants[i].r = parseInt(hexes[i].substring(1,3), 16);
        colorComponants[i].g = parseInt(hexes[i].substring(3,5), 16);
        colorComponants[i].b = parseInt(hexes[i].substring(5,7), 16);
    }
    
    return colorComponants;
}