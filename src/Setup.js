import Hand from './Hand.js';

export default class Setup {
  init(resources, app) {
    let hand = new Hand(resources.cards.textures);

    app.stage.addChild(hand);
  }
}
