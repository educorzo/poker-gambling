var PIXI = require('pixi.js');
import ButtonTextStyle from './ButtonTextStyle.js';

export default class Button extends PIXI.Graphics {
  constructor(title, id) {
    let cornerRadius = 5,
      padding = 0,
      defaultButton = {};

    super();
    this.textStyle = new ButtonTextStyle();
    defaultButton = new PIXI.Text('DEFAULT', this.textStyle);

    this._addText(title);
    padding = this._buttonText.height / 2;

    this.beginFill(0xe8d6d5, 1);
    this._bottonButton = this.drawRoundedRect(this.x, this.y, defaultButton.width, defaultButton.height + defaultButton.height / 2, cornerRadius);
    this.endFill();

    this.beginFill(0x632926, 1);
    this._topbutton = this.drawRoundedRect(this.x, this.y, defaultButton.width, defaultButton.height + defaultButton.height / 2.5, cornerRadius);
    this.endFill();

    this._buttonText.anchor.set(0.5, 0.5);
    this._buttonText.x = defaultButton.width / 2 ;
    this._buttonText.y = (defaultButton.height + defaultButton.height / 2.5)/2;

    this.interactive = true;
    this.id = id;
    this.on('pointerdown', this._onMouseDown.bind(this));
    this.on('pointerup', this._onMouseUp.bind(this));
  }

  _addText(title) {
    this._buttonText = new PIXI.Text(title, this.textStyle);

    this.addChild(this._buttonText);
  }

  _onMouseDown() {
    this._buttonText.tint = 0xAAAAAA;
    this._topbutton.tint = 0xDDDDDD;
  }

  _onMouseUp() {
    this._buttonText.tint = 0xFFFFFF;
    this._topbutton.tint = 0xFFFFFF;
  }
}
