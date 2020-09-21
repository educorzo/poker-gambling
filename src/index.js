var PIXI = require('pixi.js');
import Setup from './Setup.js';

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared;

const app = new Application({
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: 0x008000,
});
document.body.appendChild(app.view);

loader.add('cards', './assets/cards.json');

loader.load((loader, resources) => {
  let setup = new Setup();

  setup.init(resources, app);
});