import { InvalidFormat } from '../errors/InvalidFormat.js';
import { InvalidArgument } from '../errors/InvalidArgument.js';
import { logger } from '../config/pino.config.js';

export class NewCharValidations {
  constructor(image, name, age, weight, history) {

    this.isNotNull(name, 'name');
    this.stringValidator(name, 'name');
    this.lengthMax(name, 80, 'name');
    this.name = name;

    this.isNotNull(age, 'age');
    this.numberValidator(age, 'age');
    if (!Number.isInteger(age)) throw new InvalidFormat('Age must be an integer number!');
    this.bePositive(age, 'age');
    this.age = age;

    this.isNotNull(weight, 'weight');
    this.numberValidator(weight, 'weight');
    this.bePositive(weight, 'weight');
    this.weight = weight;

    this.isNotNull(history, 'history');
    this.stringValidator(history, 'history');
    this.lengthMax(history, 600, 'history');
    this.history = history;

    this.isNotNull(image, 'image');
    this.stringValidator(image, 'image');
    this.lengthMax(image, 120, 'image');
    if (image.replace(/\s+/g, '').length === 0) throw new InvalidArgument('product image');
    // try {
    //   image = new URL(image)
    //   if (image.href.indexOf('images') === -1) throw new InvalidArgument('wrong url!');
    // } catch (e) {
    //   logger.error(e);
    //   throw e;
    // }  ANULADO  ESTOY  USANDO  IMAGENES  FALSAS
    this.image = image;
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

  isNotNull(value, word) {
    if (!value) throw new InvalidArgument(`The ${word} must not be null!`);
  }
}