var PIXI = require('pixi.js');
import gsap from 'gsap';
import Card from './../Card.js';

export default class DealCardsAnimation {
  deal(cards) {
    cards.forEach((card, index) => {
      card.x = -200;
      card.rotation = 0;
      card.pivot.x = card.width;
      card.pivot.y = card.height;
    });

    this._moveCards(cards, 0);
  }

  _moveCards(cards, index) {
    let finishPosition;
    if (index < cards.length) {
      finishPosition = this._getFinishPosition(cards, index);
      gsap.to(cards[index], {
        x: finishPosition,
        rotation: 6 * Math.PI,
        time: 5000,
        onComplete: this._moveCards.bind(this, cards, index + 1)
      });
    }
  }

  _getFinishPosition(cards, index) {
    const width = cards[index].width;

    return (width + width / 10) * (cards.length - 1) - (width + width / 10) * index;
  }
}
