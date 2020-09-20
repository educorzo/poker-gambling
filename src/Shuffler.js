export default class Shuffler {

  constructor() {
    this.currentValues = [];
  }

  getRandomCardValue() {
    let rankIndex = Math.round(Math.random() * 12),
      suitIndex = Math.round(Math.random() * 3),
      result = Shuffler.validRanks[rankIndex] + Shuffler.validSuits[suitIndex];

    if(this.currentValues.includes(result)) {
      rankIndex = Math.round(Math.random() * 12);
      suitIndex = Math.round(Math.random() * 3);
      result = Shuffler.validRanks[rankIndex] + Shuffler.validSuits[suitIndex];
    }

    return result;
  }
}

Shuffler.validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
Shuffler.validSuits = ['d', 's', 'c', 'h'];
