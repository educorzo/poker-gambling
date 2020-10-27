var PIXI = require('pixi.js');
import Text from './Text.js';

export default class LogoBanner extends PIXI.Container {
    constructor(text, width, height) {
        super();

        this.text = new Text(text);
        this.background = new PIXI.Graphics();
        
        this.addChild(this.background);
        this.addChild(this.text);
    }

    fitSize(width, height) {
        this.background.beginFill(0x000000);
        this.background.drawRect(0, 0, width, height);
        this.background.endFill();
        this.text.x = width / 2;
        this.text.y = height / 2;
        this.text.pivot.set(this.text.width / 2, this.text.height / 2);
    }
}
