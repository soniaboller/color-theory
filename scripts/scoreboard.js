var game = game || {};
game.saveScore = saveScore;
game.scoresArray = [];
game.gameOver = gameOver;
game.getName = getName;
game.tallyScore = tallyScore;
// game.levelOne = levelOne;
// game.levelTwo = levelTwo;
// game.levelThree = levelThree;
// game.levelFour = levelFour;
// game.levelFive = levelFive;
// game.levelSix = levelSix;
// game.levelSeven = levelSeven;
// game.levelEight = levelEight;
// game.levelNine = levelNine;
//

function Player (name, levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven, levelEight, levelNine){
    this.name = name;

}

function saveScore(){
    game.scoresArray.push(game.score);
    console.log(game.score);
    console.log(game.scoresArray);
}


function gameOver(){
    $('#body-wrap').addClass('gameOverDialogue');
    for (var i = 0; i < game.scoresArray.length; i++){
        localStorage.setItem('level-'+ i, game.scoresArray[i])
    }
    clearTimeout(timeoutId);
    clearInterval(timer);
    game.createBoard();
    $('span').css('visibility','hidden');
}

function getName(){
    var playerName = $('#name-input').val();
    localStorage.setItem('name', playerName);
    createPlayerObject()
}
function createPlayerObject (){
    for (var i = 0; i < game.scoresArray.length; i++){
        localStorage.getItem('level-'+ i);
        var name = localStorage.getItem('name');
        var player = new Player(name, 'level-'+ i);
        console.log(player);
    }
}

function tallyScore(){
   game.totalScore = game.scoresArray.reduce(function(a, b) {
        return a + b;
    }, 0);
}