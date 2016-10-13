// need to keep track of the number of names that are put up into local storage, and put those into an array?

var game = game || {};
game.saveScore = saveScore;
game.scoresArray = [];
game.gameOver = gameOver;
game.getName = getName;
game.tallyScore = tallyScore;


function Player (name, level1, level2, level3, level4, level5, level6, level7, level8, level9){
    this.name = name;
    this.level1 = level1;
    this.level2 = level2;
    this.level3 = level3;
    this.level4 = level4;
    this.level5 = level5;
    this.level6 = level6;
    this.level7 = level7;
    this.level8 = level8;
    this.level9 = level9;
}

function saveScore(){
    game.scoresArray.push(game.score);
    console.log(game.score);
    console.log(game.scoresArray);
}


function gameOver(){
    $('#body-wrap').addClass('gameOverDialogue');
    for (var i = 0; i < game.scoresArray.length; i++){
        localStorage.setItem('level'+ (i+1), game.scoresArray[i])
    }
    game.createBoard();
    $('span').css('visibility','hidden');
    clearTimeout(timeoutId);
    clearInterval(timer);
}

function getName(){
    var playerName = $('#name-input').val();

    localStorage.setItem('name', playerName);
    createPlayerObject()
}
function createPlayerObject (){
    var localScoreArray = [];
    for (var i = 0; i <= 8; i++){
        localScoreArray.push(localStorage.getItem('level'+ (i+1)));
        console.log(localScoreArray);
    }
    var name = localStorage.getItem('name');
    var player = new Player(name, localScoreArray[0], localScoreArray[1], localScoreArray[2], localScoreArray[3], localScoreArray[4], localScoreArray[5], localScoreArray[6], localScoreArray[7], localScoreArray[8]);
    console.log(player);
    localStorage.setItem(name, JSON.stringify(player));
    var retrievedObject = localStorage.getItem(name);
    var parsedObject = JSON.parse(retrievedObject);
    console.log(parsedObject);
}

function tallyScore(){
   game.totalScore = game.scoresArray.reduce(function(a, b) {
        return a + b;
    }, 0);
}