import moment from 'moment';
import { logger } from '../config/pino.config.js';
import { InvalidFormat } from '../errors/InvalidFormat.js';
import { InvalidArgument } from '../errors/InvalidArgument.js';

export class MediaUpdateValidations {
  #media;
  constructor(media, image, title, createDate, rating, genre) {
    this.#media = media;

    if (!title) {
      this.title = this.#media.title;
    } else {
      this.stringValidator(title, 'title');
      this.lengthMax(title, 80, 'title');
      this.title = title;
    }

    if (!rating) {
      this.rating = this.#media.rating;
    } else {
      this.numberValidator(rating, 'rating');
      if (!Number.isInteger(rating)) throw new InvalidFormat('Rating must be an integer number!');
      this.bePositive(rating, 'rating');
      this.rating = rating;
    }

    if (!createDate) {
      this.createDate = this.#media.createDate;
    } else {
      this.valiDate(createDate);
      this.createDate = createDate;
    }

    if (!genre) {
      this.genre = this.#media.genre;
    } else {
      this.stringValidator(genre, 'genre');
      this.lengthMax(genre, 50, 'genre');
      this.genre = genre;
    }

    if (!image) {
      this.image = this.#media.image;
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

  valiDate(value) {
    const format = moment(value, 'YYYY-MM-DD', true);

    if (!format.isValid()) {
      throw new InvalidArgument('Invalid date format!');
    }
    return format.format('YYYY-MM-DD');
  }
}