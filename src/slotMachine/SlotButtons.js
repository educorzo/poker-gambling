var PIXI = require('pixi.js');
import Button from '../designTools/Button.js';

export default class SlotButtons extends PIXI.Container {
  constructor(textures) {
    super();
    this.buttons  =[...Array(5).keys()].map(i => new Button('Down', i));
    this.buttons.forEach((button, index) => {
        button.x = button.width * index + 10*index;
        this.interactive = true;
        this.addChild(button);
    });
  }
}