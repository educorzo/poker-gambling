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
    //Animation should be improved
  /* var dealCardsAnimation = new DealCardsAnimation();

    dealCardsAnimation.deal(this._cards);*/
  }

  fillCards() {
    let shuffler = new Shuffler();

    this._cards.forEach((card) => {
      card.setValue(shuffler.getRandomCardValue());
    });
  }

  reveal() {
    this._cards.forEach((card) => {
      card.showFace();
    });
  }

  hide() {
    this._cards.forEach((card) => {
      card.showBack();
    });
  }

  toString() {
    var result = '';

    this._cards.forEach((card) => {
      result += card.toString() + ' ';
    });

    return result.substring(0, result.length - 1);
  }

  _createHand(textures) {
    this._cards = [...Array(5).keys()].map(i => new Card(textures));
    this._cards.forEach((card, index) => {
      card.x = this._getPosition(this._cards, index);
      this.addChild(card);
    });
  }

  _setCards(cards) {
    this._cards = [];

    cards.forEach((card) => {
      this._cards.push(card);
    });
  }

  _getPosition(cards, index) {
    let width = cards[index].width,
      spaceBetweenCards = width / 10;

    return width * index + spaceBetweenCards * index;
  }
}
