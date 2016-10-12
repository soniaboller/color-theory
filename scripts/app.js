// directions & help

// smashing magazine -- local storage

$(document).ready(function(){
    console.log("linked");
});

var game = game || {};
game.score = 0;
game.time = 10;
game.level = 1;
game.colorButtonChoice = '';
game.rowNumber = 2;
game.addScore = addScore;
game.subtractScore = subtractScore;
game.generateBoard = generateBoard;
game.checkScore = checkScore;
game.timeCount = timeCount;
game.checkGameLevel = checkGameLevel;
game.createRows = createRows;
game.createBoard = createBoard;

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
            $('.box').velocity("fadeOut", { duration: 1000 });
            $('header').velocity("fadeOut", { duration: 1000 });
            game.level +=1;
            game.checkScore();
            clearTimeout(timeoutId);
            clearInterval(timer);
            console.log('time zero');
        }
        $('#time-div').html('time remaining : '+ game.time);
    }
}

function checkGameLevel (){
    if (game.level < 4){
        game.rowNumber = 2;
        // $('.box').addClass('levelOne');
        $('.rows').addClass('levelOne');


        // testing with just level 1 class
        // $('.rows').addClass('levelOne');

        //testing with just level 3
        // $('.rows').addClass('levelThree');
    }
    else if (game.level >= 4 && game.level < 7){
        game.rowNumber = 3;
        game.randomColorMultiplier = 150;
        game.randomColorAdder = 106;
        // $('.box').removeClass('levelOne').addClass('levelTwo');
        $('.rows').removeClass('levelOne').addClass('levelTwo');

        //testing with just level 1 class
        // $('.rows').addClass('levelOne');

        //testing with just level 3
        // $('.rows').addClass('levelThree');
    }
    else if (game.level >= 7){
        game.rowNumber = 4;
        game.randomColorMultiplier = 150;
        game.randomColorAdder = 106;
        // $('.box').removeClass('levelTwo').addClass('levelThree');
        $('.rows').removeClass('levelTwo').addClass('levelThree');


        // testing with just level 1 class
        // $('.rows').addClass('levelOne');

        //testing with just level 3
        // $('.rows').addClass('levelThree');
    }
    else if (game.level === 4){
        console.log('last level')
    }
}

function checkScore () {
    if (game.score < 0) {
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
    game.checkGameLevel();
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
}

function createBoard(){
    $('body').prepend('<header>');
    $('header').prepend('<span id="score-div"></span>', '<span id="time-div"></span>');
    $('#score-div').text('SCORE : ' + game.score);
    $('#time-div').text('time remaining : ' + game.time);
    generateBoard();
    $('.rows').velocity("fadeIn", { duration: 1000 });
    $('.box').on('click', game.boxClick);
    game.removeFirstRowBox();
}

// ON CLICK FUNCTIONS
$('#start').on('click', function(){
    createBoard();
    timeCount();
    $('#start').velocity("fadeOut", { delay: 750, duration: 500 });
    $('.container').addClass('hidden');
});

$('.color-button').on('click', function(){
    // turn into chooseColour(color) - green, blue, etc
    game.colorButtonChoice = this.id; // stores color button choice in game
    $('.color-button').velocity("fadeOut", { duration: 500 }); // color buttons fade out
    $('#start').velocity("fadeIn", { delay: 500, duration: 500 }); // start button fades in
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
