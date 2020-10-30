import Card from './../../src/elements/Card.js';
import Textures from '../utils/FakeTextures.js';

describe('Card', function () {
    it('should be represented as string', function() {
      let card = new Card(Textures);
      card.setValue('Q2');

      expect(card.toString()).toEqual('Q2');
    });
});
