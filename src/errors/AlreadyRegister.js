export class AlreadyRegister extends Error {
    constructor(object) {
        super(`The ${object} is already register!`);
        this.type = 'ALREADY_REGISTER';
    }
}