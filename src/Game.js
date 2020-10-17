import Shuffler from './Shuffler.js';
import GameState from './GameState.js';
var PokerComparer = require('@educorzo/poker-library');

export default class Game {
  constructor(elements) {
    this._shuffler = new Shuffler();
    this._gameState = elements.gameState;
    this._hand1 = elements.hand1;
    this._revealButton = elements.revealButton;
    this._startButton = elements.startButton;
    this._winnerText = elements.winnerText;
    this._slot = elements.slot;
    this._score = elements.score;

    this._revealButton.on('click', this._finishGame.bind(this));
    this._startButton.on('click', this._startGame.bind(this));

    this._startGame();
  }

  _startGame() {
    let me = this;
    if (this._score.canIPlay() && (this._gameState.getState() === GameState.Reveal || this._gameState.getState() === GameState.Initial)) {
      this._shuffler.resetCurrentValues();
      this._hand1.showHand();
      this._hand1.fillCards();
      this._hand1.hide();
      this._slot.init();
      this._score.reduce();
      this._winnerText.setText('');

      return this._slot.spin().then(function () {
        me._gameState.changeState(GameState.Start);
      });
    }
  }

  _finishGame() {
    let winner = '';
    if (this._gameState.getState() === GameState.Start || this._gameState.getState() === GameState.Down1 ||
      this._gameState.getState() === GameState.Down2) {
      winner = PokerComparer.compareTwoHands(this._hand1.toString(), this._slot.toString());

      this._gameState.changeState(GameState.Reveal);
      this._hand1.reveal();

      if (winner > 0) {
        this._winnerText.setText('You lose');
      } else if (winner < 0) {
        this._winnerText.setText('You win !!');
        this._score.addVictory();
      } else {
        this._winnerText.setText('Tie');
      }
    }
  }
}
