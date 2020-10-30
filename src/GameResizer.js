export default class GameResizer {

  resizeGame(game, viewport) {
    var newGameWidth, newGameHeight,
      safeWidth = 385.0400085449219,
      safeHeight = 693.219970703125;

    if (game.height / game.width > viewport.height / viewport.width) {
      if (safeHeight / game.width > viewport.height / viewport.width) {
        newGameHeight = viewport.height * game.height / safeHeight;
        newGameWidth = newGameHeight * game.width / game.height;
      } else {
        newGameWidth = viewport.width;
        newGameHeight = newGameWidth * game.height / game.width;
      }
    } else {
      if (game.height / safeWidth > viewport.height / viewport.width) {
        newGameHeight = viewport.height;
        newGameWidth = newGameHeight * game.width / game.height;
      } else {
        newGameWidth = viewport.width * game.width / safeWidth;
        newGameHeight = newGameWidth * game.height / game.width;
      }
    }

    game.scale.set(newGameWidth / game.width, newGameHeight / game.height);
  }
}