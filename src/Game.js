import Shuffler from './Shuffler.js';
var PokerComparer = require('@educorzo/poker-library');

export default class Game {
  constructor(elements) {
    this.shuffler = new Shuffler();
    this.hand1 = elements.hand1;
    this.hand2 = elements.hand2;
    this.revealButton = elements.revealButton;
    this.startButton = elements.startButton;
    this.winnerText = elements.winnerText;

    this.revealButton.on('click', this._finishGame.bind(this));
    this.startButton.on('click', this._startGame.bind(this));

    this.startGame();
  }

  _startGame() {
    this.shuffler.resetCurrentValues();
    this.hand1.showHand();
    this.hand2.showHand();
    this.hand1.fillCards();
    this.hand2.fillCards();
    this.hand1.hide();
    this.hand2.reveal();
    this.winnerText.setText('');
  }

  _finishGame() {
    let winner = PokerComparer.compareTwoHands(this.hand1.toString(), this.hand2.toString());
    this.hand1.reveal();

    if (winner > 0) {
      this.winnerText.setText('You lose');
    } else if (winner < 0) {
      this.winnerText.setText('You win !!');
    } else {
      this.winnerText.setText('Tie');
    }
  }
}
