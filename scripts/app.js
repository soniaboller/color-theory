// timer hits zero end level
// if time hits zero and score is below x number you lose
// if timer hits zero and score is above number or move on
// before game starts show color to compare darker or lighter -- maybe keep this at the top of the screen? or somewhere in the screen?
// as the game progresses make the color range smaller so it gets harder

// create a div to append boxes to rather than the body -- multiple divs to allow for horizontal sliding??

// maybe do purple and other mixed colors if time permits?

// make one giant object and attach the functions to said game object (namespace)

// on click -- name function in click function instead of function(){}

$(document).ready(function(){
    console.log("linked");
});

var game = game || {};
game.score = 0;
game.time = 25;
game.colorButtonChoice = '';
game.subtractScore = subtractScore;
game.generateBoard = generateBoard;




// jQuery selectors
    // try to declare selector variables??


// GLOBAL VARIABLES


// GAMEPLAY FUNCTIONS
function addScore(){
    game.score += 1;
    $('#score-div').html('SCORE : ' + game.score);
}

function subtractScore(){
    game.score -= 3;
    $('#score-div').html('SCORE : ' + game.score);
}

function rgbToArray(colorToConvert){
    colorArray = [];
    var color = colorToConvert.substring(3).replace('(', '').replace(')', ''); // cuts off the rgb part of color tag
    colorArray.push(color.split(', ')); // removes the commas and pushes into color array
    return colorArray;
}

function timer(){
    var timer = setInterval(countDown,1000); // counts down seconds
    function countDown(){
        game.time--;
        if(game.time == 0){
            clearInterval(timer);
        }
        $('#time-div').html('time remaining : '+ game.time);
    }
}
// ON CLICK FUNCTIONS
$('#start').on('click', function(){
    createBoard();
    timer();
    $('#start').fadeOut(500, function(){
        // start button fades out
    });

    $('.container').css('display', 'none');
    $('.box').fadeIn(1200, 'swing', function(){
        // boxes fading in at start
    });

    $('.box').on('click', game.boxClick);
});



$('.color-button').on('click', function(){
    // turn into chooseColour(color) - green, blue, etc
    game.colorButtonChoice = this.id; // stores color button choice in game
    $('.color-button').fadeOut(500, function(){}); // color buttons fade out
    $('#start').delay(500).fadeIn(500, function(){}); // start button fades in
    console.log(game.colorButtonChoice);
    return game.colorButtonChoice;
});

function setBackgroundColors() {
    if (game.colorButtonChoice === "blue"){
        game.colorRandomFunction = randomRGBBlue();
    }
    else if (game.colorButtonChoice === "red"){
        game.colorRandomFunction = randomRGBRed();
    }
    else if (game.colorButtonChoice === "purple"){
        game.colorRandomFunction = randomRGBPurple();
    }
    else if (game.colorButtonChoice === "teal"){
        game.colorRandomFunction = randomRGBTeal();
    }
    else if (game.colorButtonChoice === "green"){
        game.colorRandomFunction = randomRGBGreen();
    }
    else{

    }
}

function generateBoard(){
    for (var i = 1; i <= 100; i++) {
        setBackgroundColors();
        var $newdiv = $('<div class="box"/>');
        $('body').append($newdiv);
        $($newdiv).css('background-color', game.colorRandomFunction);
        $($newdiv).prop('id',i);
    }
}

// THIS CAN FOR SURE BE SHORTENED AND REFACTORED
var createBoard = function(){
    $('body').prepend('<header>');
    $('header').prepend('<div id="score-div"></div>', '<div id="time-div"></div>');
    $('#score-div').text('SCORE : ' + game.score);
    $('#time-div').text('time remaining : ' + game.time);
    generateBoard();
};

$('body').keydown(function(e){
    console.log(e.which);
    if(e.which === 27){
        location.reload();
        console.log('refresh');
    }
});


// set interval to keep creating colors but hide overflow?
// check if rgb([i]) is within a range -- ie a specific color?


// VARIOUS COLOR GENERATORS
function randomRGBNumber() {
    return Math.floor((Math.random() * 150) + 106);
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

function randomRGBColor() {
    return 'rgb(' + randomRGBNumber() + ', ' + randomRGBNumber() + ', ' + randomRGBNumber() + ')';
}

function hexRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//
// var colorArray = ['red', 'green', 'blue', 'pink'];
// pickRandomArrayColor = function(){
//     for(var i = 0; i < colorArray.length; i++){
//         var color = [];
//         color.push(colorArray[Math.round(Math.random() * colorArray.length)]);
//         console.log(color);
//     }
// };
// d3.select("body").append("p").text("New paragraph!");
// var dataset = [ 5, 10, 15, 20, 25 ];
// d3.select("body").selectAll("p").data(dataset).enter().append("p").text("New paragraph!");