import Shuffler from './elements/Shuffler.js';
import GameState from './elements/GameState.js';
var PokerComparer = require('@educorzo/poker-library');

export default class Game {
  constructor(elements) {
    this._shuffler = new Shuffler();
    this._gameState = elements.gameState;
    this._hand = elements.hand;
    this._revealButton = elements.revealButton;
    this._startButton = elements.startButton;
    this._winnerText = elements.winnerText;
    this._slot = elements.slot;
    this._score = elements.score;

    this._revealButton.on('pointertap', this._finishGame.bind(this));
    this._startButton.on('pointertap', this._startGame.bind(this));
  }

  _startGame() {
    let me = this,
    currentState = this._gameState.getState();
    if (this._score.canIPlay() && (currentState === GameState.Reveal || currentState === GameState.Initial)) {
      this._shuffler.resetCurrentValues();
      this._hand.showHand();
      this._hand.fillCards();
      this._hand.hide();
      this._slot.refresh();
      this._score.reduce();
      this._winnerText.setText('');
      this._gameState.changeState(GameState.Spinning);

      return this._slot.spin().then(function () {
        me._gameState.changeState(GameState.Start);
      });
    }
  }

  _finishGame() {
    let currentState = this._gameState.getState();

    if (currentState === GameState.Start || currentState === GameState.Down1 || currentState === GameState.Down2) {
      this._revealWinner();
      this._gameState.changeState(GameState.Reveal);
    }
  }

  _revealWinner() {
    let winner = PokerComparer.compareTwoHands(this._hand.toString(), this._slot.toString());
    this._hand.reveal();

    if (winner > 0) {
      this._winnerText.setText('You lose');
    } else if (winner < 0) {
      this._winnerText.setText('You win !!');
      this._score.addVictory();
    } else {
      this._winnerText.setText('Tie');
    }
    this._winnerText.pivot.x = this._winnerText.width / 2 / this._winnerText.scale.x;
  }
}
