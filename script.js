'use strict';
//calling elements.
const scorePL1 = document.querySelector('#score--0');
const scorePL2 = document.querySelector('#score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentPL1 = document.getElementById('current--0');
const currentPL2 = document.getElementById('current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const diceRoll = document.querySelector('.dice');
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
};
const init = function () {
    scorePL1.textContent = 0;
    scorePL2.textContent = 0;
    currentPL1.textContent = 0;
    currentPL2.textContent = 0;
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    diceRoll.classList.add('hidden');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    activePlayer = 0;
    score = [0, 0];
    currentScore = 0;
    playing = true;
}
let activePlayer = 0;
let score = [0, 0];
let currentScore = 0;
let playing = true;

init();
btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceRoll.classList.remove('hidden');
        diceRoll.src = `dice-${dice}.png`;
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});
btnHold.addEventListener('click', function () {
    //add current score to players score
    if (playing) {
        score[activePlayer] += currentScore;
        console.log(score[activePlayer]);
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        // check if score >=100 
        if (score[activePlayer] >= 100) {
            //finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceRoll.classList.add('hidden');
        } else {
            // switch player
            switchPlayer();
        }
    }
});
btnNew.addEventListener('click', init);
