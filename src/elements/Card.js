var PIXI = require('pixi.js');
import CardTextureNameConverter from './CardTextureNameConverter.js';

export default class Card extends PIXI.Container {
  constructor(textures) {
    super();

    this.cardTextures = textures;
    this.scale.set(0.26, 0.26);
    this._createFace();
    this._createBack();
    this._setDefault();
  }

  setValue(value) {
    this.value = value;
  }

  showFace() {
    this._setTextures();
    this.backgroundCard.renderable = true;
    this.rank.renderable = true;
    this.suit.renderable = true;
    this.suitCorner.renderable = true;
    this.back.renderable = false;
  }

  showBack() {
    this.backgroundCard.renderable = false;
    this.rank.renderable = false;
    this.suit.renderable = false;
    this.suitCorner.renderable = false;
    this.back.renderable = true;
  }

  toString() {
    return this.value.toString();
  }

  _setDefault() {
    this.value = '';
    this.showBack();
  }

  _createBack() {
    this.back = PIXI.Sprite.from(this.cardTextures['cover1.png']);

    this.addChild(this.back);
  }

  _createFace() {
    this.backgroundCard = new PIXI.Sprite.from(this.cardTextures['white1.png']);
    this.rank = new PIXI.Sprite.from(PIXI.Texture.EMPTY);
    this.suit = new PIXI.Sprite.from(PIXI.Texture.EMPTY);
    this.suitCorner = new PIXI.Sprite.from(PIXI.Texture.EMPTY);

    this._alocateSprites();

    this.addChild(this.backgroundCard);
    this.addChild(this.rank);
    this.addChild(this.suit);
    this.addChild(this.suitCorner);
  }

  _alocateSprites() {
    this.rank.y = this.backgroundCard.height/7;
    this.rank.x = this.backgroundCard.width/6;
    this.suit.y = this.backgroundCard.height/1.75;
    this.suit.x = this.backgroundCard.width/2;
    this.suitCorner.y = this.backgroundCard.height/3;
    this.suitCorner.x = this.backgroundCard.width/7;

    this.rank.anchor.set(0.5);
    this.suit.anchor.set(0.5);
    this.suitCorner.anchor.set(0.5);
  }

  _setTextures() {
    var converter = new CardTextureNameConverter(),
    textureNames = converter.getTexturesNames(this.value);

    this.rank.texture = this.cardTextures[textureNames.rank];
    this.suit.texture = this.cardTextures[textureNames.suit];
    this.suitCorner.texture = this.cardTextures[textureNames.suitCorner];
  }
}
