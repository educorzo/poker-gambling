import Shuffler from './../src/Shuffler.js';

describe('Shuffler', function () {
  let randomState = 0;

  //Return different value when it has been call more than twice
  const fakeRandom = function ()  {
    if(randomState < 2) {
      randomState++;

      return 0;
    }
    randomState--;

    return 1;
  }

  describe('giving a random card value', function () {
    const testCases = [
      { value: 0, expectedCard: '2d'}, //Min possible card
      { value: 1, expectedCard: 'Ah'} //Max possible card
    ];

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
      shuffler.currentValues = ['Ah'];
      cardValue = shuffler.getRandomCardValue();

      expect(cardValue).toEqual('2d');
    });
  });
});
