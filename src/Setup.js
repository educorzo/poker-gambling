import Hand from './Hand.js';
import Game from './Game.js';
import Slot from './slotMachine/Slot.js';
import Button from './designTools/Button.js';
import Text from './designTools/Text.js';
import GameState from './GameState.js';
import Score from './Score.js';

export default class Setup {
  init(resources, app) {
    let gameState = new GameState(),
      score = new Score(5),
      hand1 = new Hand(resources.cards.textures),
      slot = new Slot(resources.cards.textures, gameState, score),
      revealButton = new Button('Reveal'),
      startButton = new Button('Start'),
      winnerText = new Text(),
      elements = {
        hand1: hand1,
        revealButton: revealButton,
        startButton: startButton,
        winnerText: winnerText,
        slot: slot,
        gameState: gameState,
        score: score
      },
      game = new Game(elements);

    hand1.x = 200;
    hand1.y = 75;
    hand1.scale.x = hand1.scale.y = 0.50;
    score.x = 200;
    score.y = 520;
    startButton.x = 250;
    startButton.y = 460;
    revealButton.x = 350;
    revealButton.y = 460;

    winnerText.x = 250;
    winnerText.y = 250;

    slot.x = 190;

    app.stage.addChild(hand1);
    app.stage.addChild(revealButton);
    app.stage.addChild(startButton);
    app.stage.addChild(slot);
    app.stage.addChild(score);
    app.stage.addChild(winnerText);
  }
}
