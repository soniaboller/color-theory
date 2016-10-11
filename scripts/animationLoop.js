var game = game || {};
game.animationLoop = animationLoop;
game.animateBoxes = animateBoxes;
game.stopAnimateBoxes = stopAnimateBoxes;
game.shiftIntervalCounter = 1;

var intervalId;

function animateBoxes(){
    intervalId = setInterval(animationLoop, (game.time * 200));
}

function stopAnimateBoxes(){
    clearInterval(intervalId);
}

function animationLoop(){
    for (var j = 1; j <= game.rowNumber; j++) {
        for (var i = 1; i <= 100; i++) {
            var boxId = '#' + j + '-' + i;
            var boxHeight = $('.box').outerHeight( true );
            $(boxId).animate({'top' : '-' + ((boxHeight * game.shiftIntervalCounter))}, 100, 'linear');
        }
    }
    game.shiftIntervalCounter++;
}