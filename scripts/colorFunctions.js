var game = game || {};
game.randomColorMultiplier = 150;
game.randomColorAdder = 106;

function rgbToArray(colorToConvert){
    colorArray = [];
    var color = colorToConvert.substring(3).replace('(', '').replace(')', ''); // cuts off the rgb part of color tag
    colorArray.push(color.split(', ')); // removes the commas and pushes into color array
    return colorArray;
}

function randomRGBNumber() {
    return Math.floor((Math.random() * game.randomColorMultiplier) + game.randomColorAdder);
    // 100 + 156 level 2?
    // 50 + 206 level 3?
}

// mid range number to keep colors less dark
function randomMid(){
    return Math.floor((Math.random() * 175) + 106);
}

function randomRGBBlue(){
    return 'rgb(' + 0 + ', ' + 0 + ', ' + randomRGBNumber() + ')';
}

function randomRGBRed(){
    return 'rgb(' + randomRGBNumber() + ', ' + 0 + ', ' + 0 + ')';
}

function randomRGBGreen(){
    return 'rgb(' + 0 + ', ' + randomRGBNumber() + ', ' + 0 + ')';
}

function randomRGBPurple(){
    return 'rgb(' + randomMid() + ', ' + 0 + ', ' + randomMid() + ')';
}

function randomRGBTeal(){
    return 'rgb(' + 0 + ', ' + randomMid() + ', ' + randomMid() + ')';
}
