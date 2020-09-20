import Hand from './Hand.js';

export default class Setup {
  init(resources, app) {
    let hand = new Hand(resources.cards.textures);
    hand.fillCards();
    hand.reveal();
    app.stage.addChild(hand);
  }
}
