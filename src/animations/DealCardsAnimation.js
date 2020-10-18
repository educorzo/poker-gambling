import gsap from 'gsap';

export default class DealCardsAnimation {
  deal(cards) {
    cards.forEach((card) => {
      card.x = -1000;
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
        onComplete: this._moveCards.bind(this, cards, index + 1)
      });
    }
  }

  _getFinishPosition(cards, index) {
    let width = cards[index].width,
      spaceBetweenCards = width / 10;

    return (width + spaceBetweenCards) * (cards.length - 1) - (width + spaceBetweenCards) * index;
  }
}
