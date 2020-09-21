import Hand from './Hand.js';
import Game from './Game.js';
import Button from './designTools/Button.js';

export default class Setup {
  init(resources, app) {
    let hand1 = new Hand(resources.cards.textures),
      hand2 = new Hand(resources.cards.textures),
      revealButton = new Button('Reveal'),
      startButton = new Button('Start'),
      elements = {
        hand1 : hand1,
        hand2 : hand2,
        revealButton : revealButton,
        startButton : startButton
      },
      game = new Game(elements);

    hand2.y = 300;
    revealButton.x = 800;
    startButton.x = 800;
    revealButton.y = 100;

    app.stage.addChild(hand1);
    app.stage.addChild(hand2);
    app.stage.addChild(revealButton);
    app.stage.addChild(startButton);
  }
}
