import Shuffler from './../src/Shuffler.js';

describe('Shuffler', function () {
  let randomState = 0;

  //Return different value every two calls
  const fakeRandom = function ()  {
    if(randomState <  2) {
      randomState++;
      return 0;
    } else if (randomState < 4) {
      randomState++;
      return 0.5;
    }
    randomState++;

    return 1;
  }

  describe('giving a random card value', function () {
    const testCases = [
      { value: 0, expectedCard: '2d'}, //Min possible card
      { value: 1, expectedCard: 'Ah'} //Max possible card
    ];

    beforeEach(function () {
        Shuffler.currentValues = []; //Cleaning currentValues for each test
    });

    testCases.forEach((test) => {
      it(`should return a valid value with random value ${test.value} (0,1)`, () =>  {
        let cardValue,
          shuffler = new Shuffler();

        spyOn(Math, 'random').and.returnValue(test.value);
        cardValue = shuffler.getRandomCardValue();

        expect(cardValue).toEqual(test.expectedCard);
      });
    });

    it('should not deal the same card twice', function () {
      let shuffler = new Shuffler(),
        cardValue;

      Math.random = fakeRandom;
      Shuffler.currentValues = ['2d', '8c'];
      cardValue = shuffler.getRandomCardValue();

      expect(cardValue).toEqual('Ah');
    });
  });

  it('should reset the current card values (dealt cards)', function () {
    let shuffler = new Shuffler();

    Shuffler.currentValues = ['2d', '8c'];
    shuffler.resetCurrentValues();

    expect(Shuffler.currentValues).toEqual([]);
  });
});
