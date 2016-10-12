// box click not working for regenerated boxes and can't run box click funciton within box click function and somehow declaring it as a global method doens't seem to work?


// make one giant object and attach the functions to said game object (namespace)

// on click -- name function in click function instead of function(){}

// check level
// reset game to go to next level -- clear out time, maybe keep score?

// directions & help

// smashing magazine -- local storage

$(document).ready(function(){
    console.log("linked");
});

var game = game || {};
game.score = 0;
game.time = 100;
game.level = 1;
game.colorButtonChoice = '';
game.rowNumber = 4;
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
game.resetBoard = resetBoard;
game.delayResetBoard = delayResetBoard;
game.displayLevel = displayLevel;

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
            $('.box').fadeOut(500);
            $('header').fadeOut(500);
            game.level +=1;
            game.checkScore();
            clearInterval(timer);
            console.log('time zero');
        }
        $('#time-div').html('time remaining : '+ game.time);
    }
}

function displayLevel(){
    $('p').text(' LEVEL : ' + game.level);
    $('#next-level').fadeIn(500).delay(5000).fadeOut(500);
}

var boardTimeoutId;

function delayResetBoard() {
    boardTimeoutId = setTimeout(game.resetBoard, 6000);
}

function resetBoard(){
    game.createBoard();
    game.time = 25;
    game.timeCount();
}

function clearBoard(){
    $('.rows').remove();
    $('header').remove();
}

function nextLevel(){
    game.randomColorMultiplier -= 50;
    game.randomColorAdder += 50;
    game.shiftIntervalCounter = 1;
    game.clearBoard();
    game.displayLevel();
    game.delayResetBoard();
    console.log('level '+ game.level + ', color adder: ' + game.randomColorAdder + ', color multiplier: ' + game.randomColorMultiplier);
}

function checkGameLevel (){
    if (game.level === 1){
        // $('.box').addClass('levelOne');
        // $('.rows').addClass('levelOne');


        // testing with just level 1 class
        // $('.rows').addClass('levelOne');

        //testing with just level 3
        $('.rows').addClass('levelThree');
    }
    else if (game.level === 2){
        // $('.box').removeClass('levelOne').addClass('levelTwo');
        // $('.rows').removeClass('levelOne').addClass('levelTwo');

        //testing with just level 1 class
        // $('.rows').addClass('levelOne');

        //testing with just level 3
        $('.rows').addClass('levelThree');
    }
    else if (game.level === 3){
        // $('.box').removeClass('levelTwo').addClass('levelThree');
        // $('.rows').removeClass('levelTwo').addClass('levelThree');


        // testing with just level 1 class
        // $('.rows').addClass('levelOne');

        //testing with just level 3
        $('.rows').addClass('levelThree');
    }
    else if (game.level === 4){
        console.log('last level')
    }
}

function checkScore () {
    if (game.score < 1) {
        // game.gameOver();
        // alert('game over');
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
}

function generateBoard() {
    game.createRows();
    for (var j = 1; j <= game.rowNumber; j++) {
        for (var i = 1; i <= 12; i++) {
            setBackgroundColors();
            var newDiv = $('<div class="box"/>');
            $('#row-' + j).append(newDiv);
            $(newDiv).css('background-color', game.colorRandomFunction);
            $(newDiv).prop('id', j + '-' + i);
        }
    }
    game.checkGameLevel();
}


function createBoard(){
    $('body').prepend('<header>');
    $('header').prepend('<span id="score-div"></span>', '<span id="time-div"></span>');
    $('#score-div').text('SCORE : ' + game.score);
    $('#time-div').text('time remaining : ' + game.time);
    generateBoard();
    $('.box').fadeIn(1200, 'swing');
    $('.box').on('click', game.boxClick);
}

// ON CLICK FUNCTIONS
$('#start').on('click', function(){
    createBoard();
    timeCount();
    $('#start').fadeOut(500, function(){
        // start button fades out
    });
    $('.container').addClass('hidden');
    // game.animateBoxes();
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

