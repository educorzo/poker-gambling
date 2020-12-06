import BankCardsGenerator from './BankCardsGenerator.js';

export default class Shuffler {
  constructor(randomFn) {
    if (randomFn === undefined) {
      this._randomFn = Math.random;
    } else {
      this._randomFn = randomFn;
    }
  }

  getRandomCardValue() {
    let rankIndex = Math.round(this._randomFn() * 12),
      suitIndex = Math.round(this._randomFn() * 3),
      result = Shuffler.validRanks[rankIndex] + Shuffler.validSuits[suitIndex];

    while (Shuffler.currentValues.includes(result)) {
      rankIndex = Math.round(this._randomFn() * 12);
      suitIndex = Math.round(this._randomFn() * 3);
      result = Shuffler.validRanks[rankIndex] + Shuffler.validSuits[suitIndex];
    }

    Shuffler.currentValues.push(result);
    return result;
  }

  getBankCardsValues() {
    var cardsGenerator = new BankCardsGenerator(this._randomFn),
      cards = cardsGenerator.getCards();

    Shuffler.currentValues = Shuffler.currentValues.concat(cards);

    return cards;
  }

  reset() {
    Shuffler.currentValues = [];
  }
}

Shuffler.currentValues = [];
Shuffler.validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
Shuffler.validSuits = ['d', 's', 'c', 'h'];
