var totalColor = {
    'r':0,
    'g':0,
    'b':0,
}
var avgColor = {
    'r':0,
    'g':0,
    'b':0
}
var n = 0;

var colorClassesTally = {
    'r' : 0,
    'o' : 0,
    'ye' : 0,
    'g' : 0,
    'c' : 0,
    'b' : 0,
    'pu' : 0,
    'pi' : 0
}

function getColorData() {
    var dataObj = {}
}

function setNewColor(dataObj) {
    updateColorClassTally(dataObj.colorClass);
    addColorToAvg(dataObj.colorToAdd);
}

function updateColorClassTally(colorClass) {
    if(colorClass == 'r') { colorClassesTally.r ++; }
    else if(colorClass == 'o') { colorClassesTally.r ++; }
    else if(colorClass == 'y') { colorClassesTally.o ++; }
    else if(colorClass == 'g') { colorClassesTally.ye ++; }
    else if(colorClass == 'c') { colorClassesTally.g ++; }
    else if(colorClass == 'b') { colorClassesTally.c ++; }
    else if(colorClass == 'pu') { colorClassesTally.pu ++; }
    else if(colorClass == 'pi') { colorClassesTally.pi ++; }
}


function addColorToAvg(colorToAdd) {
    n++;

    totalColor.r += colorToAdd.r;
    totalColor.g += colorToAdd.g;
    totalColor.b += colorToAdd.b;

    avgColor.r = totalColor.r / n;
    avgColor.g = totalColor.g / n;
    avgColor.b = totalColor.b / n;
}

//returns a list of (pre-defined) color classes from most to least popular
//the number of places is determined by the "toPlace" perameter whose maxValue is 8 and
//will default to 8 if anything higher is entered and 1 if anything less than 1 is entered
function rankColorClasses(toPlace) {
    
}