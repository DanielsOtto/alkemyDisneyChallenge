import { logger } from '../../config/pino.config.js';
import EmptyCollection from '../../errors/EmptyCollection.js';
import { InvalidArgument } from '../../errors/InvalidArgument.js';
import { NotFound } from '../../errors/NotFound.js';
import { Op } from 'sequelize';
//errores

export class MediaRepository {
  #movieTable;
  #serieTable;
  constructor(movTable, serTable, charRepo) {
    this.#movieTable = movTable;
    this.#serieTable = serTable;
  }

  getTable(entity) {
    switch (entity) {
      case 'movie':
        return this.#movieTable;
      case 'serie':
        return this.#serieTable;
      default:
        throw new InvalidArgument('entity');
    };
  }

  async getAllMovies() { // solo lo usa Movies 
    try {
      const movies = await this.#movieTable.findAll({
        attributes: ['image', 'title', 'createDate']
      });
      if (!movies) throw new EmptyCollection('movies');
      return movies;
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async getMediaById(id, entity) {
    try {
      const table = this.getTable(entity);
      return await table.findByPk(id);
    } catch (e) {
      console.error(e);
      logger.error(e);
      throw e;
    }
  }

  async getMediaWithChars(id, entity) {// M & S + CHARACTERS
    try {
      const media = await this.getMediaById(id, entity);
      const characters = await media.getCharacters();
      if (!media) throw new NotFound(id); // revisar esto
      if (media.length === 0) throw new EmptyCollection(entity);
      return {
        media,
        characters
      };
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async getMediaByTitleAndGenre(title, genre, order, entity) {
    let media;
    try {
      const table = this.getTable(entity);
      const searchOptions = {
        where: {
          title: {
            [Op.like]: `%${title}%`
          }
        }
      }
      if (genre) searchOptions.where.genre = {
        [Op.like]: `%${genre}%`
      };

      media = await table.findAll(searchOptions);
      if (!media) throw new NotFound(title);

      if (order) {
        if (order === 'increasing') {
          media.sort((a, b) => a.date - b.date);
        } else if (order === 'decreasing') {
          media.sort((a, b) => b.date - a.date);
        } else {
          throw new InvalidArgument('Order incorrect');
        }
      }

      return media;
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async addCharacters(id, character, entity) {
    try {
      const media = await this.getMediaById(id, entity);
      await media.addCharacters(character);
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async createMedia({ image, title, createDate, rating, genre }, entity) {
    try {
      const table = this.getTable(entity);
      const media = await table.create({
        image,
        title,
        createDate,
        rating,
        genre
      });
      if (!media) throw new InvalidArgument(`saving in ${entity}`);
      return media;
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async updateMedia(id, { image, title, createDate, rating, genre }, entity) {
    try {
      const table = this.getTable(entity);
      const update = await table.update({
        image,
        title,
        createDate,
        rating,
        genre
      }, {
        where: {
          id
        }
      });
      if (update < 1) throw new InvalidArgument('id');
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async deleteMedia(id, entity) {
    try {
      const table = this.getTable(entity);
      const media = await table.destroy({
        where: {
          id
        }
      });
      if (media !== 1) throw new InvalidArgument('Nothing was deleted!');
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }
}