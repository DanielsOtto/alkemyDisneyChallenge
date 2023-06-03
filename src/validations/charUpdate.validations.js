import { InvalidFormat } from '../errors/InvalidFormat.js';
import { InvalidArgument } from '../errors/InvalidArgument.js';
import { logger } from '../config/pino.config.js';

export class CharUpdateValidations {
  #character;
  constructor(character, image, name, age, weight, history) {
    this.#character = character;

    if (!name) {
      this.name = this.#character.name;
    } else {
      this.stringValidator(name, 'name');
      this.lengthMax(name, 80, 'name');
      this.name = name;
    }

    if (!age) {
      this.age = this.#character.age;
    } else {
      this.numberValidator(age, 'age');
      if (!Number.isInteger(age)) throw new InvalidFormat('Age must be an integer number!');
      this.bePositive(age, 'age');
      this.age = age;
    }

    if (!weight) {
      this.weight = this.#character.weight;
    } else {
      this.numberValidator(weight, 'weight');
      this.bePositive(weight, 'weight');
      this.weight = weight;
    }

    if (!history) {
      this.history = this.#character.history;
    } else {
      this.stringValidator(history, 'history');
      this.lengthMax(history, 600, 'history');
      this.history = history;
    }

    if (!image) {
      this.image = this.#character.image;
    } else {
      this.stringValidator(image, 'image');
      this.lengthMax(image, 120, 'image');
      if (image.replace(/\s+/g, '').length === 0) throw new InvalidArgument('product image');
      // try {
      //   image = new URL(image)
      //   if (image.href.indexOf('images') === -1) throw new InvalidArgument('wrong url!');
      // } catch (e) {
      //   logger.error(e);
      //   throw e;
      // }
      this.image = image;
    }
  }

  stringValidator(value, word) {
    if (typeof value !== 'string') throw new InvalidFormat(`The ${word} must be a string`);
  }

  numberValidator(value, word) {
    if (typeof value !== 'number') throw new InvalidFormat(`${word} must be a number!`);
  }

  bePositive(value, word) {
    if (value <= 0) throw new InvalidArgument(`The ${word} have to be 1 or more!`);
  }

  lengthMax(value, max, word) {
    if (value.length >= max) throw new InvalidFormat(`The ${word} is very long, it can have a maximum of ${max} characters`);
  }
}