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

    this._revealButton.on('click', this._finishGame.bind(this));
    this._startButton.on('click', this._startGame.bind(this));

    this._startGame();
  }

  _startGame() {
    if (this._gameState.getState() === GameState.Reveal || this._gameState.getState() === GameState.Initial) {
      this._shuffler.resetCurrentValues();
      this._gameState.changeState(GameState.Start);
      this._hand1.showHand();
      this._hand1.fillCards();
      this._hand1.hide();
      this._slot.init();
      this._slot.spin();

      this._winnerText.setText('');
    }
  }

  _finishGame() {
    let winner = PokerComparer.compareTwoHands(this._hand1.toString(), this._slot.toString());

    this._gameState.changeState(GameState.Reveal);
    this._hand1.reveal();

    if (winner > 0) {
      this._winnerText.setText('You lose');
    } else if (winner < 0) {
      this._winnerText.setText('You win !!');
    } else {
      this._winnerText.setText('Tie');
    }
  }
}
