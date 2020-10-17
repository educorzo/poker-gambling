var PIXI = require('pixi.js');

export default class ImageButton extends PIXI.Sprite {
  constructor(image, id) {
    super();
    this.button = new PIXI.Sprite.from(image);

    this.interactive = true;
    this.id = id;

    this.addChild(this.button);
    this.on('mousedown', this._onMouseDown.bind(this));
    this.on('mouseup', this._onMouseUp.bind(this));
  }

  _onMouseDown() {
    this.button.tint = 0xDDDDDD;
  }

  _onMouseUp() {
    this.button.tint = 0xFFFFFF;
  }
}
