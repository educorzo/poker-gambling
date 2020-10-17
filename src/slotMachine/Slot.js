var PIXI = require('pixi.js');
import GameState from '../GameState.js';
import Reel from './Reel.js';
import SlotButtons from './SlotButtons.js';

export default class Slot extends PIXI.Container {
  constructor(textures, gameState, score) {
    super();

    this._textures = textures;
    this._gameState = gameState;
    this._score = score;

    this.init();
  }

  init() {
    this.reels = [...Array(5).keys()].map(i => new Reel(this._textures));
    this.reels.forEach((reel, index) => {
      reel.x = (reel.width * index) + 10 * index;
      this.addChild(reel);
    });

    this.buttons = new SlotButtons(this._textures);
    this.buttons.y = this.reels[0].height - 50;
    this.buttons.scale.x = this.buttons.scale.y = 0.5;
    
    this.addChild(this.buttons);

    this.buttons.on('click', this.onButtonsClick.bind(this));
  }

  spin() {
    this.reels.forEach((reel, index) => {
      setTimeout(reel.spin.bind(reel), index * 100);
    });
  }

  toString() {
    var result = '';

    this.reels.forEach((reel) => {
      result += reel.getCardInTheMiddle().toString() + ' ';
    });

    return result.slice(0, -1);
  }

  onButtonsClick(interactiveEvent) {
    if(this._score.canIPlay()){
      if (this._gameState.getState() === GameState.Start) {
        this._gameState.changeState(GameState.Down1);
        this._score.reduce();
        this._downOnePossition(this._getIdButton(interactiveEvent));
      } else if (this._gameState.getState() === GameState.Down1) {
        this._gameState.changeState(GameState.Down2);
        this._score.reduce();
        this._downOnePossition(this._getIdButton(interactiveEvent));
      }
    }
  }

  _downOnePossition(numberOfReel) {
    this.reels[numberOfReel].downReel(1, 1.75);
  }

  _getIdButton(interactiveEvent) {
    return interactiveEvent.target.id;
  }
}