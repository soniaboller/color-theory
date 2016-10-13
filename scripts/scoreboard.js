var game = game || {};
game.saveScore = saveScore;
game.scoresArray = [];
game.gameOver = gameOver;
game.getName = getName;
game.tallyScore = tallyScore;
game.createPlayerObject = createPlayerObject;

function createScoreboard(){
    var checkStorage = localStorage.getItem('highscores');
    var checkScoreboard = localStorage.getItem('sortedscoreboard');
    if (typeof checkStorage == 'object'){
        localStorage.setItem('highscores', JSON.stringify([]));
    }
    if (typeof checkScoreboard == 'object'){
        localStorage.setItem('scoreboard', JSON.stringify([]));
    }
    if (typeof checkScoreboard == 'object'){
    localStorage.setItem('sortedscoreboard', JSON.stringify([]));
    }
}
createScoreboard();

function Player (name, level1, level2, level3, level4, level5, level6, level7, level8, level9, totalScore) {
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
    this.totalScore = totalScore;
}

function PlayerHighScore (name, totalScore){
    this.name = name;
    this.totalScore = totalScore;
}

// saves score per level
function saveScore(){
    game.scoresArray.push(game.score);
    console.log(game.score);
    console.log(game.scoresArray);
}

function gameOver(){
    $('#paused').remove();
    $('#body-wrap').addClass('gameOverDialogue').velocity('fadeIn', { duration: 500 });
    $('#gameover-modal').velocity('fadeIn', { duration: 500 });
    for (var i = 0; i < game.scoresArray.length; i++){
        localStorage.setItem('level'+ (i+1), game.scoresArray[i])
    }
    game.createBoard();
    $('span').css('visibility','hidden');
    clearTimeout(timeoutId);
    clearInterval(timer);
}

function getName(){
    var playerName = $('#name-input').val().toUpperCase();
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
    game.tallyScore();

    var player = new Player(name, localScoreArray[0], localScoreArray[1], localScoreArray[2], localScoreArray[3], localScoreArray[4], localScoreArray[5], localScoreArray[6], localScoreArray[7], localScoreArray[8], game.totalScore);
    console.log(player);
    localStorage.setItem(name, JSON.stringify(player));
    var retrievedPlayerObject = localStorage.getItem(name);
    var parsedPlayerObject = JSON.parse(retrievedPlayerObject);
    console.log('name and all level scores:' + parsedPlayerObject);

    var scoreboardObject = new PlayerHighScore(name, game.totalScore);
    console.log(scoreboardObject);
    var scoreboardArray = JSON.parse(localStorage.getItem('scoreboard'));
    scoreboardArray.push(scoreboardObject);
    localStorage.setItem('scoreboard', JSON.stringify(scoreboardArray));

    sortScoreboard();

}

function tallyScore(){
   game.totalScore = game.scoresArray.reduce(function(a, b) {
        return a + b;
    }, 0);
    // gets score array
    var highScoreArray = JSON.parse(localStorage.getItem('highscores'));
    // pushes new score into array
    highScoreArray.push(game.totalScore);
    // resets local storage score array
    localStorage.setItem('highscores', JSON.stringify(highScoreArray));

}

// function CreateScorePairs () {
//     scoreboard.name = scoreboard.totalScore
// }

function sortScoreboard(){
    var scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
    scoreboard.sort(function(a, b) {
        return b.totalScore - a.totalScore;
    });
    console.log(scoreboard);
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));

    // var scorePairs = {};
    // scorePairs[scoreboard.name] = scoreboard.totalScore;
    // // var scorePairs = new CreateScorePairs(scoreboard.name);
    // console.log('scorePairs: '+ scorePairs);
    // var sortedScoreboardArray = JSON.parse(localStorage.getItem('sortedscoreboard'));
    // sortedScoreboardArray.push(scorePairs);
    // localStorage.setItem('sortedscoreboard', JSON.stringify(sortedScoreboardArray));
    delayScoreboard();
}

var scoreboardTimeoutId;

function delayScoreboard() {
    scoreboardTimeoutId = setTimeout(appendScoreboard, 2500);
}

// append scoreboard to page
function appendScoreboard(){
    $('#modal').velocity({
        width:'55%',
        height: '65%',
        top: '15%',
        left: '20.5%',
        padding: '2%'});
    $('#gameover-modal').velocity('fadeOut', { duration: 1000 });
    $('#scoreboard-modal').append('<h1>SCOREBOARD</h1>');
    var playerName = localStorage.getItem('name');
    var scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
    for (var i = 0; i < scoreboard.length && i <= 7; i++){
        var scoreHolder = $('<h4/>');
        $('#scoreboard-modal').append(scoreHolder);
        $(scoreHolder).text(scoreboard[i].name + ' : ' + scoreboard[i].totalScore);

        if (playerName === scoreboard[i].name){
            $(scoreHolder).prop('id','current-player');
        }
    }
    $('#scoreboard-modal').velocity('fadeIn', { delay: 1250, duration: 1000});
    $('#scoreboard-modal').append("<h3 id='esc'> press 'esc' to close and refresh </h3>");
    $('#esc').velocity('fadeIn', {delay: 2000}, {duration: 1000})
}
