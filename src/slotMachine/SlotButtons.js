var PIXI = require('pixi.js');
import ImageButton from '../designTools/ImageButton.js';

export default class SlotButtons extends PIXI.Container {
  constructor(textures, reels) {
    super();
    let numberOfButtons = reels.length;

    this.buttons = [...Array(numberOfButtons).keys()].map(i => new ImageButton(textures['h_big.png'], i));

    this.buttons.forEach((button, index) => {
      button.pivot.x = button.width / 2;
      button.scale.x = button.scale.y = 0.25;
      this.addChild(button);
      button.x = reels[index].x + reels[index].getVisualArea().width / 2;
    });
  }
}