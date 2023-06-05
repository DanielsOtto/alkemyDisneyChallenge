import moment from 'moment';
import { InvalidFormat } from '../errors/InvalidFormat.js';
import { InvalidArgument } from '../errors/InvalidArgument.js';

export class NewMediaValidations {
  constructor(image, title, createDate, rating, genre) {

    this.isNotNull(title, 'title');
    this.stringValidator(title, 'title');
    this.lengthMax(title, 80, 'title');
    this.title = title;

    this.valiDate(createDate);
    this.createDate = createDate;

    this.isNotNull(rating, 'rating');
    this.numberValidator(rating, 'rating');
    if (!Number.isInteger(rating)) throw new InvalidFormat('Rating must be an integer number!');
    this.bePositive(rating, 'rating');
    this.rating = rating;

    this.isNotNull(genre, 'genre');
    this.stringValidator(genre, 'genre');
    this.lengthMax(genre, 50, 'genre');
    this.genre = genre;

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

  valiDate(value) {
    const format = moment(value, 'YYYY-MM-DD', true);

    if (!format.isValid()) {
      throw new InvalidArgument('Invalid date format!');
    }
    return format.format('YYYY-MM-DD');
  }

  valiDate(value) {
    const format = moment(value, 'YYYY-MM-DD', false);

    if (!format.isValid()) {
      throw new InvalidArgument('Invalid date format!');
    }

    return format.format('YYYY-MM-DD');
  }
}