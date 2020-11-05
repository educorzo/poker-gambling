var PIXI = require('pixi.js');

export default class ButtonTextStyle extends PIXI.TextStyle {
  constructor() {
    super({
        fontFamily: 'Arial',
        fontSize: 25,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: '#ffffff',
        wordWrap: true,
        wordWrapWidth: 440,
        padding: 2
    });
  }
}