var PIXI = require('pixi.js');

export default class Card extends PIXI.Sprite {
  constructor(textures) {
    super(textures['cover1.png']);
  }
}
