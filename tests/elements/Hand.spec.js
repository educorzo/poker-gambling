import Hand from '../../src/elements/Hand.js';
import Card from '../../src/elements/Card.js';
import Textures from '../utils/FakeTextures.js';

describe('Hand', function () {
    it('should be represented as string', function() {
      let hand,
        card = new Card(Textures),
        card2 = new Card(Textures);

      card.setValue('2d');
      card2.setValue('As');

      hand = new Hand(Textures, [card, card2]);

      expect(hand.toString()).toEqual('2d As');
    });
});
