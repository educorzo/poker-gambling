var PIXI = require('pixi.js');
import TextStyle from './TextStyle.js';

export default class Text extends PIXI.Text {
  constructor(text) {
    super();
    this.style = new TextStyle();
    
    if(text !== undefined) {
      this.setText(text);
    }
  }

  setText(text) {
    this.text = text;
  }
}
