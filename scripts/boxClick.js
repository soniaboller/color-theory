
var game = game || {};
game.boxClick = boxClick;
game.newBox = 13;

function boxClick(){
    game.id = this.id; // id of box clicked
    var rowValue = $(this).parent().prop('id');
    var gameIdSelector = $('#' + game.id);
    var nextBox = $(gameIdSelector).next();
    var previousBox = $(gameIdSelector).prev();
    var clickedColorArray = rgbToArray($(gameIdSelector).css('backgroundColor')); // creates array for clicked color
    var nextBoxColorArray = rgbToArray(nextBox.css('backgroundColor')); // creates array for next color
    var previousBoxColorArray = rgbToArray(previousBox.css('backgroundColor')); // creates array for previous color
        if(game.colorButtonChoice === 'blue'){
            var i = 2;
        }
        else if(game.colorButtonChoice === 'green'){
            var i = 1;
        }
        else if(game.colorButtonChoice === 'red'){
            var i = 0;
        }
    game.clickedColor = parseInt(clickedColorArray[0][i]);
    game.nextColor = parseInt(nextBoxColorArray[0][i]);
    game.previousColor = parseInt(previousBoxColorArray[0][i]);
    compareColors();
    // boxes fading out on click
    $(gameIdSelector).fadeOut(500, function(){
        this.remove();
        setBackgroundColors();
        var rowToAppendTo = rowValue.split('');
        console.log(rowToAppendTo);
        var newDiv = $('<div class="box"/>');
        $('#'+ rowValue).append(newDiv);
        $(newDiv).css('background-color', game.colorRandomFunction);
        $(newDiv).css('display', 'inline');
        $(newDiv).prop('id', rowToAppendTo[4] + '-' + game.newBox);
        $(newDiv).on('click', game.boxClick);
        game.newBox++;
    });
}

function compareColors() {
    if(game.clickedColor < game.nextColor && game.clickedColor < game.previousColor){
        $('#'+ game.id).text('darker +1');
        game.addScore();
    }
    else {
        $('#'+ game.id).text('lighter -1');
        game.subtractScore();
    }
}
