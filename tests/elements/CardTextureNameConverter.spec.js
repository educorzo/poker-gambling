import CardTextureNameConverter from './../../src/elements/CardTextureNameConverter.js';

describe('CardTextureNameConverter', function () {
  describe('with invalid value ', () => {
    const testCases = [
      { value: 's'},
      { value: '2'},
      { value: 'fs'},
      { value: '2l'},
      { value: 9},
      { value: '9dd'},
      { value: ''},
      { value: 'd9'},
      { value: '1s'}
    ];

    testCases.forEach((test) => {
      it(`${test.value}, should throw error`, () =>  {
        let converter = new CardTextureNameConverter();

        expect(function(){converter.getTexturesNames(test.value)})
          .toThrow(new Error(`Invalid value: ${test.value}`));
      });
    });
  });

  describe('with Td', () => {
    it('should return the correct texture names', () =>  {
        let converter = new CardTextureNameConverter(),
        expectedNames = {
          rank : '1_T.png',
          suit : 'd_big.png',
          suitCorner :  'd_small.png'
        };

        expect(converter.getTexturesNames('Td')).toEqual(expectedNames);
    });
  });

  describe('with Jh', () => {
    it('should return the correct texture names', () =>  {
        let converter = new CardTextureNameConverter(),
        expectedNames = {
          rank : '1_J.png',
          suit : 'h_big.png',
          suitCorner :  'h_small.png'
        };

        expect(converter.getTexturesNames('Jh')).toEqual(expectedNames);
    });
  });

  describe('with 2s', () => {
    it('should return the correct texture names', () =>  {
        let converter = new CardTextureNameConverter(),
        expectedNames = {
          rank : '0_2.png',
          suit : 's_big.png',
          suitCorner :  's_small.png'
        };

        expect(converter.getTexturesNames('2s')).toEqual(expectedNames);
    });
  });

  describe('with Ac', () => {
    it('should return the correct texture names', () =>  {
        let converter = new CardTextureNameConverter(),
        expectedNames = {
          rank : '0_A.png',
          suit : 'c_big.png',
          suitCorner :  'c_small.png'
        };

        expect(converter.getTexturesNames('Ac')).toEqual(expectedNames);
    });
  });
});
