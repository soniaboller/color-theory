// timer hits zero end level
// if time hits zero and score is below x number you lose
// if timer hits zero and score is above number or move on
// before game starts show color to compare darker or lighter -- maybe keep this at the top of the screen? or somewhere in the screen?
// as the game progresses make the color range smaller so it gets harder

// create a div to append boxes to rather than the body -- multiple divs to allow for horizontal sliding??

// maybe do purple and other mixed colors if time permits?

// make one giant object and attach the functions to said game object (namespace)

// on click -- name function in click function instead of function(){}

// check level
// reset game to go to next level -- clear out time, maybe keep score?

$(document).ready(function(){
    console.log("linked");
});

var game = game || {};
game.score = 0;
game.time = 5;
game.level = 1;
game.colorButtonChoice = '';
game.rowNumber = 2;
game.addScore = addScore;
game.subtractScore = subtractScore;
game.generateBoard = generateBoard;
game.checkScore = checkScore;
game.timeCount = timeCount;
game.checkGameLevel = checkGameLevel;
game.nextLevel = nextLevel;
game.createRows = createRows;
game.clearBoard = clearBoard;
game.createBoard = createBoard;
// game.gameOver = gameOver;

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

function timeCount(){
    var timer = setInterval(countDown,1000); // counts down seconds
    function countDown(){
        game.time--;
        if(game.time == 0){
            game.level +=1;
            game.checkScore();
            clearInterval(timer);
            console.log('time zero');
        }
        $('#time-div').html('time remaining : '+ game.time);
    }
}

function clearBoard(){
    $('div').remove();
    $('header').remove();
}

function nextLevel(){
    game.clearBoard();
    game.createBoard();
    $('.box').css('display', 'inline');
    game.time = 5;
    game.timeCount();
}

function checkGameLevel (){
    if (game.level === 1){
        // $('.box').addClass('levelOne');
        $('.rows').addClass('levelOne');
    }
    else if (game.level === 2){
        // $('.box').removeClass('levelOne').addClass('levelTwo');
        $('.rows').removeClass('levelOne').addClass('levelTwo');
    }
    else if (game.level === 3){
        // $('.box').removeClass('levelTwo').addClass('levelThree');
        $('.rows').removeClass('levelTwo').addClass('levelThree');

    }
    else{
        alert('you win!');

    }
}

function checkScore () {
    if (game.score < 1) {
        // game.gameOver();
        alert('game over');
        // location.reload()
    }
    else {
        game.nextLevel();
    }
}

function createRows() {
    for (var i = 1; i <= game.rowNumber; i++) {
        var newRow = $('<div>');
        $('body').append(newRow);
        $(newRow).prop('id', 'row-' + i).addClass('rows');
    }
    game.rowNumber +=1;
}

function generateBoard() {
    game.createRows();
    for (var j = 1; j <= game.rowNumber; j++) {
        for (var i = 1; i <= 100; i++) {
            setBackgroundColors();
            var newDiv = $('<div class="box"/>');
            $('#row-' + j).append(newDiv);
            $(newDiv).css('background-color', game.colorRandomFunction);
            $(newDiv).prop('id', j + '-' + i);
        }
    }
    game.checkGameLevel();
}

// THIS CAN FOR SURE BE SHORTENED AND REFACTORED
function createBoard(){
    $('body').prepend('<header>');
    $('header').prepend('<span id="score-div"></span>', '<span id="time-div"></span>');
    $('#score-div').text('SCORE : ' + game.score);
    $('#time-div').text('time remaining : ' + game.time);
    generateBoard();
    $('.box').fadeIn(1200, 'swing', function(){
        // boxes fading in at start
    });
    $('.box').on('click', game.boxClick);
};

// ON CLICK FUNCTIONS
$('#start').on('click', function(){
    createBoard();
    timeCount();
    $('#start').fadeOut(500, function(){
        // start button fades out
    });
    $('.container').css('display', 'none');
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

$('body').keydown(function(e){
    console.log(e.which);
    if(e.which === 27){
        location.reload();
    }
});


// set interval to keep creating colors but hide overflow?
// check if rgb([i]) is within a range -- ie a specific color?

