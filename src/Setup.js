import Hand from './Hand.js';

export default class Setup {
  init(resources, app) {
    let hand = new Hand(resources.cards.textures),
     hand2 = new Hand(resources.cards.textures);
    hand.fillCards();
    hand.reveal();
    hand2.y = 300;
    hand2.fillCards();
    hand2.reveal();
    app.stage.addChild(hand);
    app.stage.addChild(hand2);
  }
}
