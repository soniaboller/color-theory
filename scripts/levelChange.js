var game = game || {};
game.nextLevel = nextLevel;
game.delayResetBoard = delayResetBoard;
game.delayClearBoard = delayClearBoard;
game.delayDisplayLevel = delayDisplayLevel;

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
    game.delayClearBoard();
    game.delayDisplayLevel();
    game.delayResetBoard();
    console.log('level '+ game.level + ', color adder: ' + game.randomColorAdder + ', color multiplier: ' + game.randomColorMultiplier);
}