// function getColorValue(inputColor){
//     var clickedColor = parseInt(clickedColorArray[0][i]);
//     var nextColor = parseInt(nextBoxColorArray[0][i]);
//     var previousColor = parseInt(previousBoxColorArray[0][i]);
//
// }
var game = game || {};
game.boxClick = boxClick;
game.newBox = 13;


// game.determineClickedColor = determineClickedColor;
// game.determineNextColor = determineNextColor;
// game.determinePreviousColor = determinePreviousColor;
//
// var temp = temp || {};


// function determineClickedColor(){
//     temp.id = this.id;
//     temp.clickedColorArray = temp.rgbToArray($('#' + id).css('backgroundColor')); // creates array for clicked color
//     temp.clickedColor = parseInt(clickedColorArray[0][i]);
//
//     console.log('this is the clicked box id ' + id); // clicked box ID
//     console.log('clicked box color array ' + clickedColorArray); //rgb array of clicked color
//
//     return clickedColor;
// }
//
// function determineNextColor(){
//     temp.nextBox = $('#' + id).next();
//     temp.nextBoxColorArray = temp.rgbToArray(nextBox.css('backgroundColor')); // creates array for next color
//     temp.nextColor = parseInt(nextBoxColorArray[0][i]);
//
//     console.log('this is the next box id ' + nextBox[0].id); // next box ID
//     console.log('next box color array ' + nextBoxColorArray); //rgb array of next color
//
//     return nextColor;
// }
//
// function determinePreviousColor() {
//     var previousBox = $('#' + id).prev();
//     var previousBoxColorArray = temp.rgbToArray(previousBox.css('backgroundColor')); // creates array for previous color
//     var previousColor = parseInt(previousBoxColorArray[0][i]);
//
//     console.log('this is the previous box id ' + previousBox[0].id); // previous box ID
//     console.log('previous box color array ' + previousBoxColorArray); //rgb array of prev color
//
//
//     return previousColor;
// }

function boxClick(){
    game.id = this.id; // id of box clicked
    var rowValue = $(this).parent().prop('id');
    console.log(rowValue);
    var nextBox = $('#' + game.id).next();
    var previousBox = $('#' + game.id).prev();
    var clickedColorArray = rgbToArray($('#' + game.id).css('backgroundColor')); // creates array for clicked color
    var nextBoxColorArray = rgbToArray(nextBox.css('backgroundColor')); // creates array for next color
    var previousBoxColorArray = rgbToArray(previousBox.css('backgroundColor')); // creates array for previous color
    console.log('this is the clicked box id ' + game.id); // clicked box ID
    console.log('this is the next box id ' + nextBox.prop('id')); // next box ID
    console.log('this is the previous box id ' + previousBox.prop('id')); // previous box ID
    console.log('clicked box color array ' + clickedColorArray); //rgb array of clicked color
    console.log('next box color array ' + nextBoxColorArray); //rgb array of next color
    console.log('previous box color array ' + previousBoxColorArray); //rgb array of prev color
    if(game.colorButtonChoice === 'blue'){
        var i = 2;
        game.clickedColor = parseInt(clickedColorArray[0][i]);
        game.nextColor = parseInt(nextBoxColorArray[0][i]);
        game.previousColor = parseInt(previousBoxColorArray[0][i]);

        console.log('clicked '+ game.clickedColor); // blue value of clicked color array
        console.log('next '+ game.nextColor); // blue value of next color array
        console.log('prev '+ game.previousColor); // blue value of prev color array
    }
    else if(game.colorButtonChoice === 'green'){
        var i = 1;
        game.clickedColor = parseInt(clickedColorArray[0][i]);
        game.nextColor = parseInt(nextBoxColorArray[0][i]);
        game.previousColor = parseInt(previousBoxColorArray[0][i]);

        console.log('clicked '+ game.clickedColor); // blue value of clicked color array
        console.log('next '+ game.nextColor); // blue value of next color array
        console.log('prev '+ game.previousColor); // blue value of prev color array
    }
    else if(game.colorButtonChoice === 'red'){
        var i = 0;
        game.clickedColor = parseInt(clickedColorArray[0][i]);
        game.nextColor = parseInt(nextBoxColorArray[0][i]);
        game.previousColor = parseInt(previousBoxColorArray[0][i]);

        console.log('clicked '+ game.clickedColor); // blue value of clicked color array
        console.log('next '+ game.nextColor ); // blue value of next color array
        console.log('prev '+ game.previousColor); // blue value of prev color array
    }
    else {
    console.log('you probably tried to add the purple button back in and there is no if else statement for that yet');
    }
    compareColors();
    // boxes fading out on click
    $('#'+ game.id).fadeOut(500, function(){
    this.remove();

        //creates new box that appends to the row it was removed from
    setBackgroundColors();
    var rowToAppendTo = rowValue.split('');
    console.log(rowToAppendTo);
    var newDiv = $('<div class="box"/>');
    $('#'+ rowValue).append(newDiv);
    $(newDiv).css('background-color', game.colorRandomFunction);
    $(newDiv).css('display', 'inline');
    $(newDiv).prop('id', rowToAppendTo[4] + '-' + game.newBox);
    $(newDiv).on('click', game.boxClick);
    // $(newDiv).on('click', function() {
    //     var base = this;
    //     game.boxClick(base);
    // });
    game.newBox++;

    // HELP HOW DO I MAKE THESE CLICKABLE??
});
}

function compareColors() {
    if(game.clickedColor < game.nextColor && game.clickedColor < game.previousColor){
        $('#'+ game.id).text('darker +1');
        console.log('darker');
        game.addScore();
    }
    else {
        $('#'+ game.id).text('lighter -1');
        console.log('lighter');
        game.subtractScore();
    }
}
