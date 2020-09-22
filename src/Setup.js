import Hand from './Hand.js';
import Game from './Game.js';
import Button from './designTools/Button.js';
import Text from './designTools/Text.js';

export default class Setup {
  init(resources, app) {
    let hand1 = new Hand(resources.cards.textures),
      hand2 = new Hand(resources.cards.textures),
      revealButton = new Button('Reveal'),
      startButton = new Button('Start'),
      winnerText = new Text(),
      elements = {
        hand1 : hand1,
        hand2 : hand2,
        revealButton : revealButton,
        startButton : startButton,
        winnerText: winnerText
      },
      game = new Game(elements);

    hand2.y = 300;
    revealButton.x = 800;
    startButton.x = 800;
    revealButton.y = 100;
    winnerText.y = 220;
    winnerText.x = 400;

    app.stage.addChild(hand1);
    app.stage.addChild(hand2);
    app.stage.addChild(revealButton);
    app.stage.addChild(startButton);
    app.stage.addChild(winnerText);
  }
}
