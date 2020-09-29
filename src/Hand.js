var PIXI = require('pixi.js');
import Card from './Card.js';
import Shuffler from './Shuffler.js';
import DealCardsAnimation from './animations/DealCardsAnimation.js';

export default class Hand extends PIXI.Container {
  constructor(textures, cards) {
    super();

    if (cards === undefined) {
      this._createHand(textures);
    } else {
      this._setCards(cards);
    }
  }

  showHand() {
    var dealCardsAnimation = new DealCardsAnimation();

    dealCardsAnimation.deal(this.cards);
  }

  fillCards() {
    let shuffler = new Shuffler();

    this.cards.forEach((card) => {
      card.setValue(shuffler.getRandomCardValue());
    });
  }

  reveal() {
    this.cards.forEach((card) => {
      card.showFace();
    });
  }

  hide() {
    this.cards.forEach((card) => {
      card.showBack();
    });
  }

  toString() {
    var result = '';

    this.cards.forEach((card) => {
      result += card.toString() + ' ';
    });

    return result.substring(0, result.length - 1);
  }

  _createHand(textures) {
    this.cards = [...Array(5).keys()].map(i => new Card(textures));
    this.cards.forEach((card) => {
      this.addChild(card);
    });
  }

  _setCards(cards) {
    this.cards = [];

    cards.forEach((card) => {
      this.cards.push(card);
    });
  }
}
