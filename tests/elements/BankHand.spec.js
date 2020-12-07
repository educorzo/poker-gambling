import BankHand from '../../src/elements/BankHand.js';
import Card from '../../src/elements/Card.js';
import Textures from '../utils/FakeTextures.js';

describe('BankHand', function () {
    it('should be represented as string', function() {
      let bankHand,
        card = new Card(Textures),
        card2 = new Card(Textures);

      card.setValue('2d');
      card2.setValue('As');

      bankHand = new BankHand(Textures, [card, card2]);

      expect(bankHand.toString()).toEqual('2d As');
    });
});
