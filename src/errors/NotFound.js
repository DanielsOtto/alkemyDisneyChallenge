export class NotFound extends Error {
  constructor(item) {
    super(`Not found: ${item}!`);
    this.type = 'NOT_FOUND';
  }
}