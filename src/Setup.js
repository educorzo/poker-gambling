import Hand from './Hand.js';
var PokerComparer = require('@educorzo/poker-library');

export default class Setup {
  init(resources, app) {
    let hand = new Hand(resources.cards.textures),
     hand2 = new Hand(resources.cards.textures);
    hand.fillCards();
    hand.reveal();
    hand2.y = 300;
    hand2.fillCards();
    hand2.reveal();
    console.log(PokerComparer.compareTwoHands(hand.toString(), hand2.toString()));
    app.stage.addChild(hand);
    app.stage.addChild(hand2);
  }
}
