import Card from './Card.js';

export default class Setup {
  init(resources, app){
    let card = new Card(resources.cards.textures);

    card.setValue('Qs');
  	app.stage.addChild(card);
    card.showFace();
  }
}
