var PIXI = require('pixi.js');
import GameState from '../elements/GameState.js';
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
    this._numberOfReels = 5;
    this._marginBetweenReels = this._frameSize / 2;

    this.init();
  }

  init() {
    this._createReels();
    this._addBackground();
    this._addReels();
    this._addLine();
    this._addSlotButtons();

    this.buttons.on('pointertap', this._onButtonsClick.bind(this));
  }

  refresh() {
    this._removeReels();
    this._removeLine();
    this._createReels();
    this._addReels();
    this._addLine();
  }

  _addBackground() {
    let reelArea = this.reels[0].getVisualArea(),
      widthOfSlotVisualArea = (reelArea.width * this._numberOfReels) +
        this._marginBetweenReels * (this._numberOfReels - 1) + this._frameSize * 2;

    this._background = new PIXI.Graphics();

    this._background.beginFill(this._backgroundColor);
    this._background.drawRoundedRect(0, reelArea.y - this._frameSize, widthOfSlotVisualArea, reelArea.height + this._frameSize * 2);
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

    return Promise.all(promises).then(function(){
      if(me._score.canIPlay()){
        me.buttons.animateButtons();
      }
      return Promise.resolve(this);
    });
  }

  toString() {
    var result = '';

    this.reels.forEach((reel) => {
      result += reel.getCardInTheMiddle().toString() + ' ';
    });

    return result.slice(0, -1);
  }

  _createReels() {
    this.reels = [...Array(this._numberOfReels).keys()].map(i => new Reel(this._textures));
    this.reels.forEach((reel, index) => {
      reel.x = (reel.width * index) + this._frameSize / 2 * index + this._frameSize;
    });
  }

  _addReels() {
    this.reels.forEach((reel) => {
      this.addChild(reel);
    });
  }

  _removeReels() {
    this.reels.forEach((reel) => {
      this.removeChild(reel);
    });
  }

  _addSlotButtons() {
    let reelArea = this.reels[0].getVisualArea();

    if (this.buttons === undefined) {
      this.buttons = new SlotButtons(this._textures, this.reels);
      this.addChild(this.buttons);

      this.buttons.y = reelArea.height + reelArea.y + this._frameSize;
      this.buttons.interactive = true;
    }
  }

  _addLine() {
    let reelArea = this.reels[0].getVisualArea();

    this.line = new PIXI.Graphics();
    this.line.beginFill(0x00008b);
    this.line.drawRect(0, reelArea.height / 2 + reelArea.y, this.width, 1);

    this.addChild(this.line);
  }

  _removeLine() {
    this.removeChild(this.line);
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