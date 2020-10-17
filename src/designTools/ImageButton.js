var PIXI = require('pixi.js');

export default class ImageButton extends PIXI.Sprite {
  constructor(image, id) {
    super();
    this.button = new PIXI.Sprite.from(image);

    this.interactive = true;
    this.id = id;

    this.addChild(this.button);
  }
}
