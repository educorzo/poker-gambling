var PIXI = require('pixi.js');
import Card from './Card.js';

export default class Hand extends PIXI.Container {
  constructor(textures) {
    super();

    this.createHand(textures);
    this.showHand();
  }

  showHand() {
    let position = 0;

    this.cards.forEach((card) => {
      card.x = position;
      this.addChild(card);
      position = position + card.width + card.width/10;
    });
  }

  /*private*/
  createHand(textures) {
    this.cards = [ ...Array(5).keys() ].map( i => new Card(textures));
  }
}
