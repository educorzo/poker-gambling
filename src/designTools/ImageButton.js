var PIXI = require('pixi.js');

export default class ImageButton extends PIXI.Container {
  constructor(image, id) {
    super();
    this.button = new PIXI.Sprite.from(image);

    this.interactive = true;
    this.id = id;

    this.addChild(this.button);
    this.button.tint = 0xDDDDDD;
    this.on('pointerdown', this._onMouseDown.bind(this));
    this.on('pointerup', this._onMouseUp.bind(this));
  }

  _onMouseDown() {
    this.button.tint = 0xAAAAAA;
  }

  _onMouseUp() {
    this.button.tint = 0xDDDDDD;
  }
}
