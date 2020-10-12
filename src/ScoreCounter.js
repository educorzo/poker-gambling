export default class ScoreCounter {
    constructor(score) {
        this._score = score;
    }

    addVictory() {
        this._score += 4;
    }

    reduce() {
        this._score--;
    }

    canIPlay() {
        return this._score > 0;
    }

    get() {
        return this._score;
    }
}