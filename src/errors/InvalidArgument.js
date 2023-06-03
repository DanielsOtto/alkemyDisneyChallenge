export class InvalidArgument extends Error {
  constructor(message) {
    if (message) {
      super(`Invalid argument: ${message}!`);
    } else {
      super(`Missing argument!`);
    }
    this.type = 'INVALID_ARGUMENT';
  }
}