var PIXI = require('pixi.js');
import Reel from './Reel.js';

export default class Slot extends PIXI.Container {
  constructor(textures) {
    super();
    this.reels  =[...Array(5).keys()].map(i => new Reel(textures));
    this.reels.forEach((reel, index) => {
        reel.x = reel.width * index;
        this.addChild(reel);
    });
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
}