var game = game || {};
game.saveScore = saveScore;
game.scoresArray = [];
game.gameOver = gameOver;
game.getName = getName;
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
}

function getName(){
    $('input').keydown(function(e){
        console.log(e.which);
        if(e.which === 13){
            console.log('input keydown works');
            var playerName = this.val();
            localStorage.setItem('name', playerName)
        }
        createPlayerObject();
    });
}
function createPlayerObject (){
    for (var i = 0; i < game.scoresArray.length; i++){
        localStorage.getItem('level-'+ i);
        var name = localStorage.getItem('name');
        var player = new Player(name, 'level-'+ i);
        console.log(player);
    }
}
