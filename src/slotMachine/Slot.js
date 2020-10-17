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
    this._addReels();
    this._addSlotButtons();
    this._addLine();

    this.buttons.on('click', this._onButtonsClick.bind(this));
  }

  spin() {
    let promises = []

    this.reels.forEach((reel, index) => {
      promises[index] = new Promise(function(resolve) {
        setTimeout(function () {
          reel.spin().then(function(){
            resolve();
          });
        }, index * 100);
      })
    });

    return Promise.all(promises);
  }

  toString() {
    var result = '';

    this.reels.forEach((reel) => {
      result += reel.getCardInTheMiddle().toString() + ' ';
    });

    return result.slice(0, -1);
  }
  
  _addReels() {
    this.reels = [...Array(5).keys()].map(i => new Reel(this._textures));
    this.reels.forEach((reel, index) => {
      reel.x = (reel.width * index) + 10 * index;
      this.addChild(reel);
    });
  }

  _addSlotButtons() {
    this.buttons = new SlotButtons(this._textures);
    this.buttons.y = this.reels[0].height - 50;
    this.buttons.scale.x = this.buttons.scale.y = 0.5;
    this.addChild(this.buttons);
  }

  _addLine() {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0x00008b);
    graphics.drawRect(0, this.height / 1.15, this.width, 1);

    this.addChild(graphics);
  }

  _onButtonsClick(interactiveEvent) {
    if (this._score.canIPlay()) {
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