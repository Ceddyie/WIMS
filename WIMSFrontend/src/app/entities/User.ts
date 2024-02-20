export class User {
    constructor(
        public _username: string,
        public _password: string,
        public _email: string,
    ) {}

    get username(): string { return this._username; }
    set username(value: string) { this._username = value;}

    get password(): string { return this._password; }
    set password(value: string) { this._password = value; }

    get email(): string { return this._email; }
    set email(value: string) { this._email = value; }
}