var PIXI = require('pixi.js');
import Card from './Card.js';
import Shuffler from './Shuffler.js';

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

  fillCards() {
    let shuffler = new Shuffler();

    this.cards.forEach((card) => {
      card.setValue(shuffler.getRandomCardValue());
    });
  }

  reveal() {
    this.cards.forEach((card) => {
      card.showFace();
    });
  }

  /*private*/
  createHand(textures) {
    this.cards = [ ...Array(5).keys() ].map( i => new Card(textures));
  }
}
