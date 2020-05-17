
// Pig game

var scores, roundScore, activePlayer, gamePlaying, prevDice=0, prevDice2=0, scoreAmount=100;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        if(prevDice === 6 && dice === 6 || prevDice2 === 6 && dice2 === 6){
            scores[activePlayer] = 0;
            roundScore = 0;
            prevDice = 0;
            prevDice2 = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            document.getElementById('current-' + activePlayer).textContent = '0';
            nextPlayer();
            
        } else {
            //Display the result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'Images/dice-' + dice + '.png';

            var diceDOM2 = document.querySelector('.dice2');
            diceDOM2.style.display = 'block';
            diceDOM2.src = 'Images/dice-' + dice2 + '.png';

            //Update the round score IF the rolled number was NOT a 1
            if (dice !== 1 && dice2 !== 1) {
                //Add score
                roundScore += dice + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                prevDice = dice;
                prevDice2 = dice2;
            } else {
                //Next player                
                nextPlayer();
            }
            
        }
    }    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {

        scoreAmount = document.querySelector('#score-amount').value;
        
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= scoreAmount) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('#score-amount').value = 100;
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    scoreAmount = 100;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#score-amount').value = 100;
}









/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
