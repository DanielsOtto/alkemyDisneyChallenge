export class EmptyCollection extends Error {
  constructor(collection) {
    super(`The ${collection} collection is empty`);
    this.type = 'EMPTY_COLLECTION';
  }
}