var currentColor = {
    'r' : 255,
    'g' : 0,
    'b' : 0
};

var degToColor = [];

for (var theta = 0; theta < 360; theta++) { colorChanger(theta); }

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

    degToColor[theta] = new Object;
    degToColor[theta].r = currentColor.r;
    degToColor[theta].g = currentColor.g;
    degToColor[theta].b = currentColor.b;
}