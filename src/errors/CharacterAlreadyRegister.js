export class CharacterAlreadyRegister extends Error {
  constructor(character) {
    super(`The character: ${character} is already register!`);
    this.type = 'CHAR_REGISTER';
  }
}