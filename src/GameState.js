export default class GameState {
    constructor(state) {
        if (state === undefined) {
            this._state = GameState.Initial;
        } else {
            this._state = state;
        }
    }

    changeState(state) {
        if (this._state === GameState.Initial && state !== GameState.Start) {
            throw new Error(`It is not possible to go from ${this._state} to ${state}`);
        }
        if (this._state === GameState.Start && state === GameState.Down2) {
            throw new Error(`It is not possible to go from ${this._state} to ${GameState.Down2}`);
        }
        if (this._state === GameState.Reveal && (state === GameState.Down1 || state === GameState.Down2)) {
            throw new Error(`It is not possible to go from ${GameState.Reveal} to ${state}`);
        }
        if (state === GameState.Start && (this._state === GameState.Down1 || this._state === GameState.Down2)) {
            throw new Error(`It is not possible to go from ${this._state} to ${state}`);
        }

        return this._state = state;
    }

    getState() {
        return this._state;
    }
}

GameState.Initial = 'Initial'
GameState.Start = 'Start';
GameState.Reveal = 'Reveal';
GameState.Down1 = 'Down1';
GameState.Down2 = 'Down2';
