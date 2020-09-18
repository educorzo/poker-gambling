import Setup from './../src/Setup.js';
import Card from './../src/Card.js';
import FakeApp from './utils/FakeApp.js';
import resources from './utils/FakeResources.js';

describe('Setup', function () {
  it('should show the 5h card', function () {
    let app = new FakeApp(),
      expectedCard = new Card(resources.cards.textures),
      setup = new Setup();

    expectedCard.setValue('5h');
    setup.init(resources, app);

    expect(app.stage.childs[0]).toEqual(expectedCard);
  });
});
