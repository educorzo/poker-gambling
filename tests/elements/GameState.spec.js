import GameState from '../../src/elements/GameState.js';

describe('GameState', function () {
    describe('when it is not described', function () {
        it('should be initialize with initial game', function () {
            let gameState = new GameState();

            expect(gameState.getState()).toEqual(GameState.Initial);
        });
    });

    describe('when it is described', function () {
        it('should be initialize with a proper game state', function () {
            let gameState = new GameState(GameState.Down1);

            expect(gameState.getState()).toEqual(GameState.Down1);
        });
    });

    describe('when changing the game state', function () {
        it('should change state', function () {
            let gameState = new GameState(GameState.Start);

            gameState.changeState(GameState.Reveal);

            expect(gameState.getState()).toEqual(GameState.Reveal);
        });
    });

    describe('Not allowed movements', function () {
        const testCases = [
            { initialState: GameState.Initial, endState: GameState.Down1 },
            { initialState: GameState.Initial, endState: GameState.Down2 },
            { initialState: GameState.Initial, endState: GameState.Reveal },
            { initialState: GameState.Initial, endState: GameState.Start },
            { initialState: GameState.Spinning, endState: GameState.Reveal },
            { initialState: GameState.Spinning, endState: GameState.Down1 },
            { initialState: GameState.Spinning, endState: GameState.Down2 },
            { initialState: GameState.Start, endState: GameState.Down2 },
            { initialState: GameState.Reveal, endState: GameState.Down1 },
            { initialState: GameState.Reveal, endState: GameState.Down2 },
            { initialState: GameState.Down1, endState: GameState.Start },
            { initialState: GameState.Down2, endState: GameState.Start }
        ];

        testCases.forEach((test) => {
            it(`should thrown exception when moving from  ${test.initialState} to ${test.endState}`, () => {
                let gameState = new GameState(test.initialState);

                expect(function () { gameState.changeState(test.endState) })
                    .toThrow(new Error(`It is not possible to go from ${test.initialState} to ${test.endState}`));
            });
        });
    });
});
