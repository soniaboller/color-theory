var game = game || {};
// game.animationLoop = animationLoop;
game.animateBoxes = animateBoxes;
game.stopAnimateBoxes = stopAnimateBoxes;
game.removeFirstRowBox = removeFirstRowBox;
// game.shiftIntervalCounter = 1;


var intervalId;

function animateBoxes(){
    intervalId = setInterval(removeFirstRowBox, 5000);
}

function stopAnimateBoxes(){
    clearInterval(intervalId);
}

var j = 1, countup = true;

var timeoutId;

function removeFirstRowBox(){
    timeoutId = setTimeout(function(){
        if (countup){
            createBox();
            removeFirstRowBox();
            j++;
            if (j >= game.rowNumber){
                countup = false;
            }
        }
        else {
            createBox();
            removeFirstRowBox();
            j--;
            if (j <= 1){
                countup = true
            }
        }
    }, 1000);
    game.newBox++;
}

function createBox(){
    var rowSelected = $('.box:first-child');
    console.log(rowSelected[j-1]);
    $(rowSelected[j-1]).remove();
    setBackgroundColors();
    var newDiv = $('<div class="box"/>');
    console.log ('#row-' + j);
    $('#row-' + j).append(newDiv);
    $(newDiv).css('background-color', game.colorRandomFunction);
    $(newDiv).css('display', 'inline');
    $(newDiv).prop('id', j + '-' + game.newBox);
    $(newDiv).on('click', game.boxClick);
}

// function removeFirstRowBox(){
//     $('.box:first-child').remove();
//     for (var j = 1; j <= game.rowNumber; j++) {
//             setBackgroundColors();
//             var newDiv = $('<div class="box"/>');
//             $('#row-' + j).append(newDiv);
//             $(newDiv).css('background-color', game.colorRandomFunction);
//             $(newDiv).css('display', 'inline');
//             $(newDiv).prop('id', j + '-' + game.newBox);
//         $('.box').on('click', game.boxClick);
//         }
//         game.newBox++
// }

//
// function animationLoop(){
//     for (var j = 1; j <= game.rowNumber; j++) {
//         for (var i = 1; i <= 12; i++) {
//             var boxId = '#' + j + '-' + i;
//             var boxWidth = $('.box').outerWidth( true );
//             $(boxId).animate({'left' : '-' + ((boxWidth * game.shiftIntervalCounter))}, 100, 'linear');
//         }
//
//
//     }
//     game.shiftIntervalCounter++;
//     console.log('animation loop counter: '+ game.shiftIntervalCounter);
// }
//
