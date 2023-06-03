export class InvalidFormat extends Error {
  constructor(item) {
    super(`Invalid format: ${item}!`);
    this.type = 'INVALID_FORMAT';
  }
}