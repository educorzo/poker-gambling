import GameResizer from './../src/GameResizer.js';

describe('GameResizer', function () {
    let gameContainer = {
        width: 400,
        height: 700,
        scale: {set: jasmine.createSpy()}
    },
    viewport = {
        width: 50,
        height: 50
    },
    gameResizer = new GameResizer();

    describe('when proportion of game is bigger than screen', function () {
        describe('and screen is wider than game', function () {
            it('should set the proper scale', function() {
                viewport.width = 500;
                viewport.height = 600;
                gameResizer.resizeGame(gameContainer, viewport);

                expect(gameContainer.scale.set).toHaveBeenCalledWith(0.9090909090909092, 0.9090909090909091);
            });
        });
        describe('and screen is not wider than game', function () {
            it('should set the proper scale', function() {
                viewport.width = gameContainer.width;
                viewport.height = 699;
                gameResizer.resizeGame(gameContainer, viewport);

                expect(gameContainer.scale.set).toHaveBeenCalledWith(1, 1);
            });
        });
    });

    describe('when proportion of game is not bigger than screen', function () {
        describe('and screen is smaller than game', function () {
            it('should set the proper scale', function() {
                viewport.width = 390;
                viewport.height = gameContainer.height;
                gameResizer.resizeGame(gameContainer, viewport);

                expect(gameContainer.scale.set).toHaveBeenCalledWith(1, 1);
            });
        });
        describe('and screen has more height than game', function () {
            it('should set the proper scale', function() {
                viewport.width = 350;
                viewport.height = gameContainer.height*2;
                gameResizer.resizeGame(gameContainer, viewport);

                expect(gameContainer.scale.set).toHaveBeenCalledWith(0.9089964477267202, 0.9089964477267203);
            });
        });
    });

});
