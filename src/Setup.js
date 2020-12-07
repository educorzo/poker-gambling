var PIXI = require('pixi.js');
import BankHand from './elements/BankHand.js';
import Game from './Game.js';
import Slot from './slotMachine/Slot.js';
import Button from './designTools/Button.js';
import Text from './designTools/Text.js';
import LogoBanner from './designTools/LogoBanner.js';
import GameState from './elements/GameState.js';
import Score from './elements/Score.js';
import GameResizer from './GameResizer.js';

export default class Setup {
  init(resources, app) {
    let gameState = new GameState(),
      score = new Score(100),
      bankHand = new BankHand(resources.cards.textures),
      slot = new Slot(resources.cards.textures, gameState, score),
      revealButton = new Button('Reveal'),
      startButton = new Button('Start'),
      winnerText = new Text('Press start'),
      logo = new LogoBanner("Poker slot"),
      elements = {
        bankHand: bankHand,
        revealButton: revealButton,
        startButton: startButton,
        winnerText: winnerText,
        slot: slot,
        gameState: gameState,
        score: score
      },
      background = new PIXI.Graphics(),
      gameContainer = new PIXI.Container(),
      padding = 20,
      gameResizer = new GameResizer(),
      viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

    new Game(elements)

    gameContainer.addChild(background);
    gameContainer.addChild(bankHand);
    gameContainer.addChild(logo);
    gameContainer.addChild(revealButton);
    gameContainer.addChild(startButton);
    gameContainer.addChild(slot);
    gameContainer.addChild(score);
    gameContainer.addChild(winnerText);

    logo.fitSize(bankHand.width + padding, bankHand.height / 1.25);

    gameContainer.pivot.x = gameContainer.width / 2;
    gameContainer.x = window.innerWidth / 2;

    logo.x = 0;
    this._center(bankHand, gameContainer);
    bankHand.y = logo.height + padding;

    this._center(slot, gameContainer);
    slot.y = bankHand.y - padding / 2;

    startButton.x = slot.x - slot.width / 2; //Slot.x is in the center of the screen
    revealButton.x = slot.x + slot.width / 2 - revealButton.width;
    revealButton.y = startButton.y = bankHand.y + bankHand.height + padding + slot.height;
    score.anchor.set(0.5, 0.5);
    score.x = slot.x;
    score.y = startButton.y + startButton.height * 1.5;
    score.scale.set(0.75, 0.75);

    this._center(winnerText, gameContainer);
    winnerText.scale.set(1.5, 1.5);
    winnerText.y = slot.y + slot.height;
    this._fillBackground(gameContainer, background, 0x008000);

    app.stage.addChild(gameContainer);

    gameResizer.resizeGame(gameContainer, viewport);

    window.onresize = function () {
      viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      gameContainer.pivot.x = gameContainer.width / 2 / gameContainer.scale.x;
      gameContainer.x = window.innerWidth / 2;
      gameResizer.resizeGame(gameContainer, viewport);
    };
  }

  _fillBackground(object, background, color) {
    background.beginFill(color);
    background.drawRect(0, 0, object.width, object.height);
    background.endFill();
  }

  _center(element, parent) {
    element.pivot.x = element.width / 2 / element.scale.x;
    element.x = parent.pivot.x;
  }
}
