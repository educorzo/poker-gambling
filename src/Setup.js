import Hand from './Hand.js';
import Button from './designTools/Button.js';
var PokerComparer = require('@educorzo/poker-library');

export default class Setup {
  init(resources, app) {
    let hand = new Hand(resources.cards.textures),
      hand2 = new Hand(resources.cards.textures),
      revealButton = new Button('Reveal');

    hand.fillCards();
    hand2.y = 300;
    hand2.fillCards();
    hand2.reveal();
    revealButton.x = 800;
    revealButton.on('click', () => {
      hand.reveal();
    });

    console.log(PokerComparer.compareTwoHands(hand.toString(), hand2.toString()));

    app.stage.addChild(hand);
    app.stage.addChild(hand2);
    app.stage.addChild(revealButton);
  }
}
