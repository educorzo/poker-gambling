import Shuffler from './Shuffler.js';
var PokerComparer = require('@educorzo/poker-library');

export default class Game {
  constructor(elements) {
    this.shuffler = new Shuffler();
    this.hand1 = elements.hand1;
    this.hand2 = elements.hand2;
    this.revealButton = elements.revealButton;
    this.startButton = elements.startButton;

    this.revealButton.on('click', this.finishGame.bind(this));
    this.startButton.on('click', this.startGame.bind(this));

    this.startGame();
  }

  startGame() {
    this.shuffler.resetCurrentValues();
    this.hand1.fillCards();
    this.hand2.fillCards();
    this.hand1.hide();
    this.hand2.reveal();
  }

  finishGame() {
    this.hand1.reveal();

    console.log(PokerComparer.compareTwoHands(hand1.toString(), hand2.toString()));
  }
}
