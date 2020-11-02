var PIXI = require('pixi.js');
import Setup from './Setup.js';

let Application = PIXI.Application,
    loader = PIXI.Loader.shared;

const app = new Application({
	width: window.innerWidth,
	height: window.innerHeight,
  backgroundColor: 0x006000,
  resizeTo: window,
  autoDensity: true,
  resolution: 2,
  antialias: true
});

document.getElementById('gamecontainer').appendChild(app.view);

loader.add('cards', 'assets/cards.json');

loader.load((loader, resources) => {
  let setup = new Setup();

  setup.init(resources, app);
});
