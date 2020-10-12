import ScoreCounter from './../src/ScoreCounter.js';

describe('Score', function () {
    describe('when add victory', function () {
        it('should add 4 points', function () {
            let scoreCounter = new ScoreCounter(0);
            scoreCounter.addVictory();

            expect(scoreCounter.get()).toEqual(4);
        });
    });

    describe('when reducing the score', function () {
        it('should rest 1 point', function () {
            let scoreCounter = new ScoreCounter(1);
            scoreCounter.reduce();

            expect(scoreCounter.get()).toEqual(0);
        });
    });

    describe('when score is 0', function () {
        describe('and I ask can I play?', function () {
            it('should return false', function () {
                let scoreCounter = new ScoreCounter(0);

                expect(scoreCounter.canIPlay()).toBeFalse();
            });
        });
    });

    describe('when score is lower than 0', function () {
        describe('and I ask can I play?', function () {
            it('should return false', function () {
                let scoreCounter = new ScoreCounter(-1);
                expect(scoreCounter.canIPlay()).toBeFalse();
            });
        });
    });

    describe('when score is greater than 0', function () {
        describe('and I ask can I play?', function () {
            it('should return true', function () {
                let scoreCounter = new ScoreCounter(1);
                expect(scoreCounter.canIPlay()).toBeTruthy();
            });
        });
    });
});
