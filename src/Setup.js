var PIXI = require('pixi.js');
import Hand from './Hand.js';
import Game from './Game.js';
import Slot from './slotMachine/Slot.js';
import Button from './designTools/Button.js';
import Text from './designTools/Text.js';
import LogoBanner from './designTools/LogoBanner.js';
import GameState from './GameState.js';
import Score from './Score.js';

export default class Setup {
  init(resources, app) {
    let gameState = new GameState(),
      score = new Score(5),
      hand = new Hand(resources.cards.textures),
      slot = new Slot(resources.cards.textures, gameState, score),
      revealButton = new Button('Reveal'),
      startButton = new Button('Start'),
      winnerText = new Text('Press start'),
      logo = new LogoBanner("Poker slot"),
      elements = {
        hand: hand,
        revealButton: revealButton,
        startButton: startButton,
        winnerText: winnerText,
        slot: slot,
        gameState: gameState,
        score: score
      },
      background = new PIXI.Graphics(),
      game = new Game(elements),
      gameContainer = new PIXI.Container(),
      padding = 20;

    gameContainer.addChild(background);
    gameContainer.addChild(hand);
    gameContainer.addChild(logo);
    gameContainer.addChild(revealButton);
    gameContainer.addChild(startButton);
    gameContainer.addChild(slot);
    gameContainer.addChild(score);
    gameContainer.addChild(winnerText);

    logo.fitSize(hand.width + padding, hand.height);

    gameContainer.pivot.x = gameContainer.width / 2;
    gameContainer.x = window.innerWidth / 2;

     logo.x = 0;
    this._center(hand, gameContainer);
    hand.y = logo.height + padding;

    this._center(slot, gameContainer);
    slot.y = hand.y - padding / 2;

    revealButton.x = gameContainer.pivot.x;
    revealButton.y = startButton.y = hand.y + hand.height + padding + slot.height;
    score.y = startButton.y + startButton.height + padding/2;

    this._center(winnerText, gameContainer);
    winnerText.y = slot.y + slot.height;
    this._fillBackground(gameContainer, background, 0x008000);

    app.stage.addChild(gameContainer);
    gameContainer.scale.set(1.25,1.25); //TODO: Modify according to screen
  }

  _fillBackground(object, background, color) {
    background.beginFill(color);
    background.drawRect(0, 0, object.width, window.innerHeight);
    background.endFill();
  }

  _center(element, parent) {
    element.pivot.x = element.width / 2 / element.scale.x;
    element.x = parent.pivot.x;
  }
}
