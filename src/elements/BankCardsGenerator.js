var poker = require('@educorzo/poker-library');

export default class BankCardsGenerator {
    constructor(randomFn) {
        var currentFunction,
            i;

        this._randomFn = randomFn;
        this._handGenerator = poker.createRandomHandGenerator(this._randomFn);
        this._handProbabilities = {
            '0': this._handGenerator.getRoyalFlush.bind(this._handGenerator),
            '2': this._handGenerator.getStraightFlush.bind(this._handGenerator),
            '6': this._handGenerator.getFourOfAKind.bind(this._handGenerator),
            '10': this._handGenerator.getFullHouse.bind(this._handGenerator),
            '16': this._handGenerator.getFlush.bind(this._handGenerator),
            '24': this._handGenerator.getStraight.bind(this._handGenerator),
            '33': this._handGenerator.getThreeOfAKind.bind(this._handGenerator),
            '43': this._handGenerator.getTwoPairs.bind(this._handGenerator),
            '52': this._handGenerator.getPair.bind(this._handGenerator),
            '63': this._handGenerator.getHighCard.bind(this._handGenerator)
        };
        this._handsFn = [];

        for (i = 0; i <= 100; i++) {
            if (this._handProbabilities[i.toString()] !== undefined) {
                currentFunction = this._handProbabilities[i.toString()];
            }
            this._handsFn.push(currentFunction);
        }
    }

    getCards() {
        var value = Math.floor((this._randomFn() * 100)),
            cardsRepresentation = this._handsFn[value]();

        return cardsRepresentation.split(' ');
    }
}