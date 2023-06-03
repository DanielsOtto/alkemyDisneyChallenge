export class ForbiddenAccess extends Error {
  constructor(email) {
    if (email) {
      super(`Forbidden access: ${email}!`);
    } else {
      super('Forbidden access!');
    }
    this.type = 'FORBIDDEN_ACCESS';
  }
}