import gsap from 'gsap';

export default class DealCardsAnimation {
  deal(cards) {
    this.animation = gsap.timeline();

    return this._moveCards(cards);
  }

  _moveCards(cards) {
    this._moveCard(cards[0]);
    this._moveCard(cards[1]);
    this._moveCard(cards[2]);
    this._moveCard(cards[3]);
    return this._moveCard(cards[4]);
  }

  _moveCard(card) {
    let originXPosition = card.x,
      originYPosition = card.y,
      finishXPosition = card.width / 2 + card.x,
      finishYPosition = card.height / 2 + card.y;

    card.rotation = 0;
    card.y = -100;
    card.x = 300;
    card.pivot.set(card.width / 2 / card.scale.x, card.height / 2 / card.scale.y);

    return this.animation.to(card, {
      x: finishXPosition,
      y: finishYPosition,
      rotation: 6 * Math.PI,
      onComplete: function () {
        card.rotation = 0;
        card.pivot.set(0, 0);
        card.x = originXPosition,
          card.y = originYPosition;
      }
    })
  }
}
