import Hand from './Hand.js';
import Game from './Game.js';
import Slot from './Slot.js';
import Button from './designTools/Button.js';
import Text from './designTools/Text.js';

export default class Setup {
  init(resources, app) {
    let hand1 = new Hand(resources.cards.textures),
      slot = new Slot(resources.cards.textures),
      revealButton = new Button('Reveal'),
      startButton = new Button('Start'),
      spinButton = new Button('Spin'),
      winnerText = new Text(),
      elements = {
        hand1 : hand1,
        revealButton : revealButton,
        startButton : startButton,
        spinButton : spinButton,
        winnerText: winnerText,
        slot: slot
      },
      game = new Game(elements);

    hand1.x = 75;
    hand1.y = 100;
    revealButton.x = 800;
    startButton.x = 800;
    revealButton.y = 100;
    spinButton.x = 800;
    spinButton.y = 300;
    winnerText.y = 220;
    winnerText.x = 400;
    slot.x = 400;
    slot.y = 150;

    app.stage.addChild(hand1);
    app.stage.addChild(revealButton);
    app.stage.addChild(startButton);
    app.stage.addChild(spinButton);
    app.stage.addChild(winnerText);
    app.stage.addChild(slot);
  }
}
