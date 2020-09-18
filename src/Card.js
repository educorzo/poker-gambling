var PIXI = require('pixi.js');

export default class Card extends PIXI.Sprite {
  constructor(textures) {
    super(textures['cover1.png']);
    this.cardTextures = textures;
  }

  setValue(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}
