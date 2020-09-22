var PIXI = require('pixi.js');
import TextStyle from './TextStyle.js';

export default class Text extends PIXI.Text {
  constructor() {
    super();
    this.style = new TextStyle();
  }

  setText(text) {
    this.text = text;
  }
}
