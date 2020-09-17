import Setup from './../src/Setup.js';
import Card from './../src/Card.js';

describe('Setup', function () {
  it('should show a card', function () {
    let app = {
        stage : {
          addChild: jasmine.createSpy()
        }
      },
      resources = {
        cards : {
          textures : ['2_big.png', 'cover1.png']
        }
      },
      setup = new Setup();

    setup.init(resources, app);

    expect(app.stage.addChild).toHaveBeenCalledWith(new Card(resources));
  });
});
