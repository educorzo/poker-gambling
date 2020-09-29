var PIXI = require('pixi.js');
import Card from './../Card.js';

export default class DealCardsAnimation {

  deal(cards) {
    let finishPosition = 0,
      ticker = new PIXI.Ticker();
    finishPosition = this._getFinishPosition(cards, 0);

    cards.forEach((card, index) => {
      card.x = -200;
      card.pivot.x = card.width;
      card.pivot.y = card.height;
    });

    ticker.add(this._moveCards.bind(this, cards, 0, finishPosition, ticker));

    ticker.start();
  }

  _moveCards(cards, index, finishPosition, ticker) {
    if (cards[index].position.x < finishPosition) {
      cards[index].position.x += 3;
      cards[index].rotation += 0.2;
    } else if (index + 1 < cards.length) {
      cards[index].rotation = 0;
      ticker.destroy();
      ticker = new PIXI.Ticker();
      finishPosition = this._getFinishPosition(cards, index + 1);
      ticker.add(this._moveCards.bind(this, cards, index + 1, finishPosition, ticker));
      ticker.start();
    } else {
      cards[index].rotation = 0;
      ticker.destroy();
    }
  }

  _getFinishPosition(cards, index) {
    const width = cards[index].width;

    return (width + width / 10) * (cards.length - 1) - (width + width / 10) * index;
  }
}
