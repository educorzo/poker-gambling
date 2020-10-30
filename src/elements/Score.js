var PIXI = require('pixi.js');
import TextStyle from '../designTools/TextStyle.js';
import ScoreCounter from './ScoreCounter.js';

export default class Score extends PIXI.Text{
    constructor(score) {
      super();
      this.style = new TextStyle();
      this._scoreCounter = new ScoreCounter(score);
      this.text = this._scoreCounter.get();
    }

    addVictory() {
        this._scoreCounter.addVictory();
        this.text = this._scoreCounter.get();
    }

    reduce() {
        this._scoreCounter.reduce();
        this.text = this._scoreCounter.get();
    }

    canIPlay() {
        return this._scoreCounter.canIPlay();
    }
}