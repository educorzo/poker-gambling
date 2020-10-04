var PIXI = require('pixi.js');
import gsap from 'gsap';
import Card from './Card.js';
import Shuffler from './Shuffler.js';

export default class Reel extends PIXI.Container {
  constructor(textures) {
    super();

    this.numSymbols = 6;
    this._setCards(textures);
    this.cardHeight = this.cards[0].height;
    this._makeFrame();
  }

  spin() {
    let randomizer = Math.round(Math.random() * (this.numSymbols - 1));
    this.animation = gsap.timeline();
    this._simpleSpin(1.75);
    this._simpleSpin(1.50);
    this._simpleSpin(1);
    this._simpleSpin(0.75);
    this._simpleSpin(0.5);
    this._simpleSpin(0.25);
    this._simpleSpin(0.25);
    this._downReel(randomizer, 0.01);
    this._simpleSpin(0.5);
    this._simpleSpin(0.75);
    this._simpleSpin(1);
    this._simpleSpin(1.50);
    this._simpleSpin(1.75);
  }

  getCardInTheMiddle() {
    let me = this;

    return this.cards.find(function (card) {
      return parseInt(card.y) <= parseInt(me.cardHeight * (me.numSymbols / 2)) &&
        parseInt(card.y) >= parseInt(me.cardHeight * (me.numSymbols / 2) - 1);
    });
  }

  _setCards(textures) {
    var shuffler = new Shuffler();

    this.cards = [...Array(this.numSymbols).keys()].map(i => new Card(textures));
    this.cards.forEach((card, index) => {
      card.setValue(shuffler.getRandomCardValue());
      card.scale.x = card.scale.y = 0.20;
      card.y = card.height * index;
      card.showFace();
      this.addChild(card);
    });
  }

  _makeFrame() {
    var upperBound = new PIXI.Graphics();
    upperBound.drawRect(0, this.cardHeight * 2 - 15, this.width, this.height - this.cardHeight * 2.65);
    upperBound.renderable = true;
    upperBound.cacheAsBitmap = true;
    this.addChild(upperBound);
    this.mask = upperBound;
  }

  _simpleSpin(duration) {
    this.animation.to(this.cards, {
      duration: duration,
      ease: "none",
      y: "+=" + this.cardHeight * this.numSymbols,
      modifiers: {
        y: gsap.utils.unitize(y => parseFloat(y) % (this.cardHeight * this.numSymbols))
      }
    });
  }

  _downReel(times, duration) {
    this.animation.to(this.cards, {
      duration: duration,
      ease: "none",
      y: "+=" + this.cardHeight * times,
      modifiers: {
        y: gsap.utils.unitize(y => parseFloat(y) % (this.cardHeight * this.numSymbols))
      }
    });
  }

}
