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
    this._backgroundColor = 0x000000;
    this._frameSize = 20;
    this._timeBetweenReels = 100;

    this.init();
  }

  init() {
    this._createReels();
    this._addBackground();
 
    this._addSlotButtons();
    this._addReels();

    this._addLine();

    this.buttons.on('click', this._onButtonsClick.bind(this));
  }

  _addBackground() {
    let reelArea = this.reels[0].getVisualArea();
    
    this._background = new PIXI.Graphics();

    this._background.beginFill(this._backgroundColor);
    this._background.drawRect(0, reelArea.y - this._frameSize, this.width + this._frameSize, reelArea.height + this._frameSize * 2);
    this._background.endFill();

    this.addChild(this._background);
  }

  spin() {
    let me = this,
      promises = [];

    this.reels.forEach((reel, index) => {
      promises[index] = new Promise(function (resolve) {
        setTimeout(function () {
          reel.spin().then(function () {
            resolve();
          });
        }, index * me._timeBetweenReels);
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

  _createReels() {
    this.reels = [...Array(5).keys()].map(i => new Reel(this._textures));
    this.reels.forEach((reel, index) => {
      reel.x = (reel.width * index) + this._frameSize / 2 * index + this._frameSize;
    });
  }

  _addReels() {
    this.reels.forEach((reel, index) => {
      this.addChild(reel);
    });
  }

  _addSlotButtons() {
    let reelArea = this.reels[0].getVisualArea();

    this.buttons = new SlotButtons(this._textures);

    this.buttons.x = 20; //TODO: Make button aligned with reels
    this.buttons.y = reelArea.height + reelArea.y + this._frameSize;
    this.buttons.scale.x = this.buttons.scale.y = 0.5;

    this.addChild(this.buttons);
  }

  _addLine() {
    let graphics = new PIXI.Graphics(),
      reelArea = this.reels[0].getVisualArea();;

    graphics.beginFill(0x00008b);
    graphics.drawRect(0, reelArea.height / 2 + reelArea.y, this.width, 1);

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
    this.reels[numberOfReel].downReel(1, 1.5);
  }

  _getIdButton(interactiveEvent) {
    return interactiveEvent.target.id;
  }
}