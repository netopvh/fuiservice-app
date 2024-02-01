export class Token {

    private _token: string;

    constructor(token: string) {
        this._token = token;
    }

    get token() {
        return this._token;
    }

    set token(token) {
        this._token = token;
    }

    toJson() {
        return {
            token: this._token,
        }
    }
}