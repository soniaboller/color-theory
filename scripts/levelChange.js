var game = game || {};
game.nextLevel = nextLevel;
game.delayResetBoard = delayResetBoard;
game.delayClearBoard = delayClearBoard;
game.delayDisplayLevel = delayDisplayLevel;
game.checkScore = checkScore;
game.checkGameLevel = checkGameLevel;
game.numberReset = numberReset;

var boardTimeoutId;

function delayResetBoard() {
    boardTimeoutId = setTimeout(resetBoard, 7000);
    function resetBoard(){
        game.createBoard();
        game.timeCount();
    }
}
function delayClearBoard() {
    boardTimeoutId = setTimeout(clearBoard, 3000);
    function clearBoard(){
        $('.rows').remove();
        $('header').remove();
    }
}

function delayDisplayLevel() {
    boardTimeoutId = setTimeout(displayLevel, 1000);
    function displayLevel(){
        $('p').text(' LEVEL : ' + game.level);
        $('#next-level').velocity("fadeIn", { duration: 1000 })
            .velocity("fadeOut", { delay: 4000, duration: 1000 });
        // $('#next-level').toggleClass('hidden');
    }
}

function nextLevel(){
    game.randomColorMultiplier -= 50;
    game.randomColorAdder += 50;
    game.shiftIntervalCounter = 1;
    game.time = 10;
    game.numberReset();
    game.delayClearBoard();
    game.delayDisplayLevel();
    game.delayResetBoard();
    console.log('level '+ game.level + ', color adder: ' + game.randomColorAdder + ', color multiplier: ' + game.randomColorMultiplier);
}

function checkGameLevel (){
    if (game.level < 4){
        // $('.box').addClass('levelOne');
        $('.rows').addClass('levelOne');


        // testing with just level 1 class
        // $('.rows').addClass('levelOne');

        //testing with just level 3
        // $('.rows').addClass('levelThree');
    }
    else if (game.level >= 4 && game.level < 7){

        // $('.box').removeClass('levelOne').addClass('levelTwo');
        $('.rows').removeClass('levelOne').addClass('levelTwo');

        //testing with just level 1 class
        // $('.rows').addClass('levelOne');

        //testing with just level 3
        // $('.rows').addClass('levelThree');
    }
    else if (game.level >= 7){
        // $('.box').removeClass('levelTwo').addClass('levelThree');
        $('.rows').removeClass('levelTwo').addClass('levelThree');


        // testing with just level 1 class
        // $('.rows').addClass('levelOne');

        //testing with just level 3
        // $('.rows').addClass('levelThree');
    }
    else {
        console.log('past level')
    }
}

function numberReset(){
    if (game.level === 4){
        game.rowNumber = 3;
        game.randomColorMultiplier = 150;
        game.randomColorAdder = 106;
    }
    else if (game.level === 7){
        game.rowNumber = 4;
        game.randomColorMultiplier = 150;
        game.randomColorAdder = 106;
    }
}

function checkScore () {
    if (game.score < 1) {
        game.gameOver();
    }
    else {
        game.nextLevel();
    }
}