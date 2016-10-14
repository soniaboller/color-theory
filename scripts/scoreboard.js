var game = game || {};
game.saveScore = saveScore;
game.scoresArray = [];
game.gameOver = gameOver;
game.getName = getName;
game.createPlayerObject = createPlayerObject;

var scoreboardModal = $('#scoreboard-modal');
var scoreboardTimeoutId;

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
}

function gameOver(){
    $('#paused').remove();
    $('#body-wrap').addClass('gameOverDialogue').velocity('fadeIn', { duration: 1000 });
    $('#gameover-modal').velocity('fadeIn', { duration: 1000 });
    for (var i = 0; i < game.scoresArray.length; i++){
        localStorage.setItem('level'+ (i+1), game.scoresArray[i])
    }
    $('span').css('visibility','hidden');
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
    }
    var name = localStorage.getItem('name');
    game.totalScore = game.score;
    var scoreboardObject = new PlayerHighScore(name, game.totalScore);
    var scoreboardArray = JSON.parse(localStorage.getItem('scoreboard'));
    scoreboardArray.push(scoreboardObject);
    localStorage.setItem('scoreboard', JSON.stringify(scoreboardArray));

    sortScoreboard();
}

function sortScoreboard(){
    var scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
    scoreboard.sort(function(a, b) {
        return b.totalScore - a.totalScore;
    });
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
    delayScoreboard();
}

function delayScoreboard() {
    scoreboardTimeoutId = setTimeout(appendScoreboard, 2000);
}

function appendScoreboard(){
    $('#modal').velocity({
        width:'55%',
        height: '65%',
        top: '15%',
        left: '20.5%',
        padding: '2%'});
    $('#gameover-modal').velocity('fadeOut', { duration: 1000 });
    $(scoreboardModal).prepend('<h1>SCOREBOARD</h1>');
    var playerName = localStorage.getItem('name');
    var scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
    for (var i = 0; i < scoreboard.length && i <= 20; i++){
        var scoreHolder = $('<h4/>');
        $('#scoreboard-container').append(scoreHolder);
        $(scoreHolder).text(scoreboard[i].name + ' : ' + scoreboard[i].totalScore);

        if (playerName === scoreboard[i].name){
            $(scoreHolder).prop('id','current-player');
        }
    }
    $(scoreboardModal).velocity('fadeIn', { delay: 1250, duration: 1000});
    $("#current-player").velocity("scroll", {
        container: $("#scoreboard-container"),
        duration: 800,
        delay: 1500
    });
    $(scoreboardModal).append("<h3 id='esc'> press 'esc' to close and refresh </h3>");
    $('#esc').velocity('fadeIn', {delay: 3000}, {duration: 1000});
}
