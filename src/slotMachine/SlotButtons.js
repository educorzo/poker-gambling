var PIXI = require('pixi.js');
import gsap from 'gsap';
import PixiPlugin from "gsap/PixiPlugin";
import ImageButton from '../designTools/ImageButton.js';

export default class SlotButtons extends PIXI.Container {
  constructor(textures, reels) {
    super();
    let numberOfButtons = reels.length;

    this._buttons = [...Array(numberOfButtons).keys()].map(i => new ImageButton(textures['h_big.png'], i));

    this._buttons.forEach((button, index) => {
      button.pivot.x = button.width / 2;
      button.scale.x = button.scale.y = 0.25;
      this.addChild(button);
      button.x = reels[index].x + reels[index].getVisualArea().width / 2;
    });

    PixiPlugin.registerPIXI(PIXI);
    gsap.registerPlugin(PixiPlugin);
  }

  animateButtons() {
    let me = this,
      animations = [];

    this._buttons.forEach(function (button) {
      animations.push(me._beat(button, 3));
    });

    return Promise.all(animations);
  }

  _beat(button, times) {
    let originalx = button.scale.x,
      originaly = button.scale.y,
      animation = gsap.timeline(),
      i = 0;

    for (i; i < times; i++) {
      animation.to(button.scale, {
        x: originalx - 0.05,
        y: originaly - 0.05
      });
      animation.to(button.scale, {
        x: originalx,
        y: originaly
      });
    }

    return animation;
  }
}