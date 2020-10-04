var PIXI = require('pixi.js');
import Reel from './Reel.js';
import SlotButtons from './SlotButtons.js';

export default class Slot extends PIXI.Container {
  constructor(textures) {
    super();
    this.reels  =[...Array(5).keys()].map(i => new Reel(textures));
    this.reels.forEach((reel, index) => {
        reel.x = reel.width * index;
        this.addChild(reel);
    });

    this.buttons = new SlotButtons();
    this.buttons.y = this.reels[0].height - 50;
    this.buttons.x = -17;
    this.buttons.scale.x = this.buttons.scale.y = 0.5;
    this.addChild(this.buttons);

    this.buttons.on('click', this.onButtonsClick.bind(this));
  }

  spin() {
    this.reels.forEach((reel, index) => {
        setTimeout(reel.spin.bind(reel), index * 400);
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
    this.reels[this._getIdButton(interactiveEvent)].downReel(1, 1);

  }

  _getIdButton(interactiveEvent) {
    return interactiveEvent.target.id;
  }
}