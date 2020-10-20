var PIXI = require('pixi.js');
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
      hand = new Hand(resources.cards.textures),
      slot = new Slot(resources.cards.textures, gameState, score),
      revealButton = new Button('Reveal'),
      startButton = new Button('Start'),
      winnerText = new Text('Default'),
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
      handWidth = hand.width,
      winnerTextWidth = winnerText.width,
      game = new Game(elements),
      gameContainer = new PIXI.Container();

    this._fillBackground(gamecontainer, background, 0x000000);
    gameContainer.addChild(background);
    gameContainer.addChild(hand);
    gameContainer.addChild(revealButton);
    gameContainer.addChild(startButton);
    gameContainer.addChild(slot);
    gameContainer.addChild(score);
    gameContainer.addChild(winnerText);

    gameContainer.pivot.x = gameContainer.width/2;
    gameContainer.x = window.innerWidth/2;
    
    hand.pivot.x = handWidth / 2;
    hand.x = gameContainer.pivot.x;
    hand.y = 20;

    slot.pivot.x = slot.width / 2;
    slot.x = gameContainer.pivot.x;
    slot.y = 10;
    
    startButton.x = slot.x / 10;
    startButton.y = 475;
    
    revealButton.x = gameContainer.pivot.x;
    revealButton.y = 475;
    
    score.y = startButton.y + startButton.height;

    winnerText.pivot.x = winnerTextWidth / 2;
    winnerText.x = gameContainer.pivot.x;
    winnerText.y = 250;

    this._fillBackground(gameContainer, background, 0x008000);
    app.stage.addChild(gameContainer);
  }

  _fillBackground(object, background, color) {
    background.beginFill(color);
    background.drawRect(0, 0, object.width, object.height);
    background.endFill();
  }
}
