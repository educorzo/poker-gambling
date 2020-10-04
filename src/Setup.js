import Hand from './Hand.js';
import Game from './Game.js';
import Slot from './slotMachine/Slot.js';
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

    hand1.x = 200;
    hand1.y = 50;
    hand1.scale.x = hand1.scale.y = 0.50;
    revealButton.x = 800;
    startButton.x = 800;
    revealButton.y = 100;
    spinButton.x = 800;
    spinButton.y = 300;
    winnerText.x = 250;
    winnerText.y = 120;
    slot.x = 210;
    slot.y = 50;

    app.stage.addChild(hand1);
    app.stage.addChild(revealButton);
    app.stage.addChild(startButton);
    app.stage.addChild(spinButton);
    app.stage.addChild(winnerText);
    app.stage.addChild(slot);
  }
}
