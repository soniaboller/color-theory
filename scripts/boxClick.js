// function getColorValue(inputColor){
//     var clickedColor = parseInt(clickedColorArray[0][i]);
//     var nextColor = parseInt(nextBoxColorArray[0][i]);
//     var previousColor = parseInt(previousBoxColorArray[0][i]);
//
// }
var game = game || {};
game.boxClick = boxClick;
game.determineClickedColor = determineClickedColor;
game.determineNextColor = determineNextColor;
game.determinePreviousColor = determinePreviousColor;

var temp = temp || {};


function determineClickedColor(){
    temp.id = this.id;
    temp.clickedColorArray = temp.rgbToArray($('#' + id).css('backgroundColor')); // creates array for clicked color
    temp.clickedColor = parseInt(clickedColorArray[0][i]);

    console.log('this is the clicked box id ' + id); // clicked box ID
    console.log('clicked box color array ' + clickedColorArray); //rgb array of clicked color

    return clickedColor;
}

function determineNextColor(){
    temp.nextBox = $('#' + id).next();
    temp.nextBoxColorArray = temp.rgbToArray(nextBox.css('backgroundColor')); // creates array for next color
    temp.nextColor = parseInt(nextBoxColorArray[0][i]);

    console.log('this is the next box id ' + nextBox[0].id); // next box ID
    console.log('next box color array ' + nextBoxColorArray); //rgb array of next color

    return nextColor;
}

function determinePreviousColor() {
    var previousBox = $('#' + id).prev();
    var previousBoxColorArray = temp.rgbToArray(previousBox.css('backgroundColor')); // creates array for previous color
    var previousColor = parseInt(previousBoxColorArray[0][i]);

    console.log('this is the previous box id ' + previousBox[0].id); // previous box ID
    console.log('previous box color array ' + previousBoxColorArray); //rgb array of prev color


    return previousColor;
}

function boxClick () {
    // var id = this.id; // id of box clicked
    // var nextBox = $('#' + id).next();
    // var previousBox = $('#' + id).prev();
    // var clickedColorArray = rgbToArray($('#' + id).css('backgroundColor')); // creates array for clicked color
    // var nextBoxColorArray = rgbToArray(nextBox.css('backgroundColor')); // creates array for next color
    // var previousBoxColorArray = rgbToArray(previousBox.css('backgroundColor')); // creates array for previous color
    // console.log('this is the clicked box id ' + id); // clicked box ID
    // // console.log('this is the next box id ' + nextBox[0].id); // next box ID
    // // console.log('this is the previous box id ' + previousBox[0].id); // previous box ID
    // console.log('clicked box color array ' + clickedColorArray); //rgb array of clicked color
    // console.log('next box color array ' + nextBoxColorArray); //rgb array of next color
    // console.log('previous box color array ' + previousBoxColorArray); //rgb array of prev color
    if (game.colorButtonChoice === 'blue') {
        var i = 2;
    }
    else if (game.colorButtonChoice === 'green'){
        var i = 1;
    }
    else if (game.colorButtonChoice === 'red'){
        var i = 0;
    }
    else {
        console.log('you probably tried to add the purple button back in and there is no if else statement for that yet');
    }
        game.determineClickedColor();
        game.determineNextColor();
        game.determinePreviousColor();
        console.log('clicked ' + clickedColor); // blue value of clicked color array
        console.log('next ' + nextColor); // blue value of next color array
        console.log('prev ' + previousColor); // blue value of prev color array
        compareColors();
        $('#' + id).fadeOut(500, function () {
            // must remove because if not then the next and previous boxes evaluated are just the ones that are still on the screen but hidden
            this.remove();
            // boxes fading out on click
        })
}

function compareColors() {
    if(clickedColor < nextColor && clickedColor < previousColor){
        $('#'+id).text('darker');
        console.log('darker');
        addScore();
    }
    else {
        $('#'+id).text('lighter');
        console.log('lighter');
        subtractScore();
    }
}