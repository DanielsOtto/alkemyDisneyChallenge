export class EmailAlreadyRegister extends Error {
  constructor(email) {
    super(`The email is already register: ${email}!`);
    this.type = 'EMAIL_REGISTER';
  }
}