var PIXI = require('pixi.js');
import gsap from 'gsap';
import PixiPlugin from "gsap/PixiPlugin";
import Card from '../Card.js';
import Shuffler from '../Shuffler.js';

export default class Reel extends PIXI.Container {
  constructor(textures) {
    super();

    this.numSymbols = 6;
    this._setCards(textures);
    this.cardHeight = this.cards[0].height;
    this._makeFrame();
    PixiPlugin.registerPIXI(PIXI);
    gsap.registerPlugin(PixiPlugin);
    this.animation = gsap.timeline();
  }

  spin() {
    let randomizer = Math.round(Math.random() * (this.numSymbols - 1));

    this._simpleSpin(1.50);
    this._simpleSpin(0.25);
    this._simpleSpin(0.25);
    this.downReel(randomizer, 0.01);
    this._simpleSpin(0.25);
    this._simpleSpin(0.25);
    this._simpleSpin(0.75);
    this._simpleSpin(1.75);
    this._rebound();
  }

  getCardInTheMiddle() {
    let me = this;

    return this.cards.find(function (card) {
      return parseInt(card.y) <= parseInt(me.cardHeight * (me.numSymbols / 2)) &&
        parseInt(card.y) >= parseInt(me.cardHeight * (me.numSymbols / 2) - 1);
    });
  }

  downReel(times, duration) {
    this._tween(duration, this.cardHeight * times);
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
    let upperBound = new PIXI.Graphics();

    upperBound.drawRect(0, this.cardHeight * 2 - 15, this.width, this.height - this.cardHeight * 2.65);
    upperBound.renderable = true;
    upperBound.cacheAsBitmap = true;
    
    this.addChild(upperBound);
    this.mask = upperBound;
  }

  _simpleSpin(duration) {
    this._tween(duration, this.cardHeight * this.numSymbols);
  }

  _rebound() {
    this._tween(1.75, -10);
    this._tween(1.75, 10);
  }

  _tween(duration, yMovement) {
    this.animation.to(this.cards, {
      duration: duration,
      ease: 'none',
      y: '+=' + yMovement,
      pixi: {blurY : this._blurring(duration)},
      modifiers: {
        y: gsap.utils.unitize(y => parseFloat(y) % (this.cardHeight * this.numSymbols))
      }
    });
  } 

  _blurring(duration) {
    let maxBlurry = 7,
      maxDuration = 1.75;

    return maxBlurry - (maxBlurry/maxDuration * duration);
  }
}
