var PIXI = require('pixi.js');
import Text from './Text.js';

export default class LogoBanner extends PIXI.Container {
    constructor(text) {
        super();

        this._text = new Text(text);
        this._background = new PIXI.Graphics();

        this.addChild(this._background);
        this.addChild(this._text);
    }

    fitSize(width, height) {
        this._background.beginFill(0x000000);
        this._background.drawRect(0, 0, width, height);
        this._background.endFill();
        this._text.scale.set(1.5, 1.5);
        this._text.x = width / 2;
        this._text.y = height / 2;
        this._text.pivot.set(this._text.width / 2 / this._text.scale.x, this._text.height / 2 / this._text.scale.y);
    }
}
