import Shuffler from '../../src/elements/Shuffler.js';

describe('Shuffler', function () {
  afterEach(function () {
    Shuffler.currentValues = [];
  });

  describe('giving a random card value', function () {
    const testCases = [
      { value: 0, expectedCard: '2d' }, //Min possible card
      { value: 1, expectedCard: 'Ah' } //Max possible card
    ];

    beforeEach(function () {
      Shuffler.currentValues = []; //Cleaning currentValues for each test
    });

    testCases.forEach((test) => {
      it(`should return a valid value with random value ${test.value} (0,1)`, () => {
        let cardValue,
          fakeRandom = function () {
            return test.value;
          },
          shuffler = new Shuffler(fakeRandom);

        spyOn(Math, 'random').and.returnValue(test.value);
        cardValue = shuffler.getRandomCardValue();

        expect(cardValue).toEqual(test.expectedCard);
      });
    });

    it('should not deal the same card twice', function () {
      let fakeRandomValue = 0,
        fakeRandom = function () {
          return ++fakeRandomValue % 2;
        },
        shuffler = new Shuffler(fakeRandom),
        cardValue;

      Shuffler.currentValues = ['2d', '8c'];
      cardValue = shuffler.getRandomCardValue();

      expect(cardValue).toEqual('Ad');
    });
  });

  it('should reset the current card values (dealt cards)', function () {
    let shuffler = new Shuffler();

    Shuffler.currentValues = ['2d', '8c'];
    shuffler.reset();

    expect(Shuffler.currentValues).toEqual([]);
  });

  describe('giving bank cards values', function () {
    describe('and random returns 0', function () {
      it('should return a flush royal', function () {
        let fakeRandom = function () { return 0; },
          shuffler = new Shuffler(fakeRandom);

        expect(shuffler.getBankCardsValues()).toEqual(['Td', 'Jd', 'Qd', 'Kd', 'Ad']);
        expect(Shuffler.currentValues).toEqual(['Td', 'Jd', 'Qd', 'Kd', 'Ad']);
      });
    });

    describe('and random returns 1', function () {
      it('should return a flush royal', function () {
        let fakeRandom = function () { return 1; },
          shuffler = new Shuffler(fakeRandom);

        expect(shuffler.getBankCardsValues()).toEqual(['Ah', 'Qh', 'Jh', 'Th', '9c']);
        expect(Shuffler.currentValues).toEqual(['Ah', 'Qh', 'Jh', 'Th', '9c']);
      });
    });
  });
});
