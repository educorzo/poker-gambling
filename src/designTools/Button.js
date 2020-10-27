var PIXI = require('pixi.js');
import TextStyle from './TextStyle.js';

export default class Button extends PIXI.Graphics {
  constructor(title, id) {
    super();
    this.textStyle = new TextStyle();
    this.beginFill(0, 1);
    this._addText(title);
    this.drawRoundedRect(this.x, this.y, this.buttonText.width, this.buttonText.height);
    this.interactive = true;
    this.id = id;
  }

  _addText(title) {
    this.buttonText = new PIXI.Text(title, this.textStyle);

    this.addChild(this.buttonText);
  }
}
