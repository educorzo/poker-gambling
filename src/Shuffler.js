export default class Shuffler {

  getRandomCardValue() {
    let rankIndex = Math.round(Math.random() * 12),
      suitIndex = Math.round(Math.random() * 3),
      result = Shuffler.validRanks[rankIndex] + Shuffler.validSuits[suitIndex];

    while(Shuffler.currentValues.includes(result)) {
      rankIndex = Math.round(Math.random() * 12);
      suitIndex = Math.round(Math.random() * 3);
      result = Shuffler.validRanks[rankIndex] + Shuffler.validSuits[suitIndex];
    }

    Shuffler.currentValues.push(result);
    return result;
  }

  resetCurrentValues() {
    Shuffler.currentValues = [];
  }
}

Shuffler.currentValues = [];
Shuffler.validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
Shuffler.validSuits = ['d', 's', 'c', 'h'];
