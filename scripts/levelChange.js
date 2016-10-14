var game = game || {};
game.nextLevel = nextLevel;
game.delayResetBoard = delayResetBoard;
game.delayClearBoard = delayClearBoard;
game.delayDisplayLevel = delayDisplayLevel;
game.checkGameLevel = checkGameLevel;
game.numberReset = numberReset;
game.saveScore = saveScore;
game.scoresArray = [];
game.animationSpeed = 1500;

var boardTimeoutId;

function delayResetBoard() {
    boardTimeoutId = setTimeout(resetBoard, 7000);
    function resetBoard(){
        game.time = 10;
        // game.score = 0;
        game.createBoard();
        game.timeCount();
    }
}

function delayClearBoard() {
    boardTimeoutId = setTimeout(clearBoard, 750);
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
    if (game.level === 10) {
        gameOver();
        return
    }
    game.randomColorMultiplier -= 50;
    game.randomColorAdder += 50;
    game.shiftIntervalCounter = 1;
    game.numberReset();
    game.delayClearBoard();
    game.delayDisplayLevel();
    game.delayResetBoard();
    console.log('level '+ game.level + ', color adder: ' + game.randomColorAdder + ', color multiplier: ' + game.randomColorMultiplier);
}

function checkGameLevel (){
    if (game.level < 4){
        $('.rows').addClass('levelOne');
    }
    else if (game.level >= 4 && game.level < 7){
        $('.rows').removeClass('levelOne').addClass('levelTwo');
        game.animationSpeed = 1250;
    }
    else if (game.level >= 7){
        $('.rows').removeClass('levelTwo').addClass('levelThree');
        game.animationSpeed = 1000;
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

function saveScore(){
    game.scoresArray.push(game.score);
    console.log(game.score);
    console.log(game.scoresArray);
}
