var PIXI = require('pixi.js');
import ImageButton from '../designTools/ImageButton.js';

export default class SlotButtons extends PIXI.Container {
  constructor(textures) {
    super();
    this.buttons  =[...Array(5).keys()].map(i => new ImageButton(textures['h_big.png'], i));
    this.buttons.forEach((button, index) => {
        button.x = button.width * index + 125 * index;
        button.scale.x = button.scale.y = 0.5;
        this.interactive = true;
        this.addChild(button);
    });
  }
}