import { logger } from '../../config/pino.config.js';
import { EmptyCollection } from '../../errors/EmptyCollection.js';
import { InvalidArgument } from '../../errors/InvalidArgument.js';
import { NotFound } from '../../errors/NotFound.js';
import { Op } from 'sequelize';
// SIRVE TANTO PARA MOVIES como SERIES
// utilizo el valor de entity para determinar que tabla se va a usar
// entity se crea mediante un middleware, y se le asigna el valor segun que endpoint sea

export class MediaRepository {
  #movieTable;
  #serieTable;
  constructor(movTable, serTable) {
    this.#movieTable = movTable;
    this.#serieTable = serTable;
  }

  getTable(entity) { // para obtener la tabla
    switch (entity) {
      case 'movie':
        return this.#movieTable;
      case 'serie':
        return this.#serieTable;
      default:
        throw new InvalidArgument('entity');
    };
  }

  async getAllMovies() {
    try {// retorna todas las peliculas
      const movies = await this.#movieTable.findAll({
        attributes: ['image', 'title', 'createDate']
      });
      if (!movies) throw new EmptyCollection('movies');
      return movies;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getMediaByTitle(title, entity, validate = true) {
    try { // retorna pelicula/serie mediante el titulo,
      const table = this.getTable(entity);
      const media = await table.findOne({
        where: {
          title
        }
      });
      if (validate) {
        if (!media) throw new NotFound(title);
      }
      return media;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getMediaById(id, entity) {
    try { // obtiene pelicula/serie mediante ID
      const table = this.getTable(entity);
      const media = await table.findByPk(id);
      if (!media) throw new NotFound(id);
      return media;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getMediaWithChars(id, entity) {
    try {// retorna pelicula/serie + personajes
      const media = await this.getMediaById(id, entity);
      const characters = await media.getCharacters();
      if (media.length === 0) throw new EmptyCollection(entity);
      return {
        media,
        characters
      };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getMediaByTitleAndGenre(title, genre, order, entity) {
    let media;
    try {// retorna la pelicula/seria por titulo 
      //filtra por genero, puede ordenarse de forma ascendente o descendente
      const table = this.getTable(entity);
      const searchOptions = {
        where: {
          title: {
            [Op.like]: `%${title}%`
          }
        }
      }
      if (genre) {
        searchOptions.where.genre = {
          [Op.like]: `%${genre}%`
        };
      }

      media = await table.findAll(searchOptions);
      if (!media) throw new NotFound(title);

      if (order) {
        order = order.toLowerCase();
        if (order === 'increasing') {
          media.sort((a, b) => a.createDate - b.createDate);
        } else if (order === 'decreasing') {
          media.sort((a, b) => b.createDate - a.createDate);
        } else {
          throw new InvalidArgument('Order incorrect');
        }
      }

      return media;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async addCharacters(id, character, entity) {
    try { // agrega personajes a las peliculas/series
      const media = await this.getMediaById(id, entity);
      await media.addCharacters(character);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createMedia({ image, title, createDate, rating, genre }, entity) {
    try {// guarda peliculas/series en la bd
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
      logger.error(e);
      throw e;
    }
  }

  async updateMedia(id, { image, title, createDate, rating, genre }, entity) {
    try { // actualiza las peliculas/series
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
      logger.error(e);
      throw e;
    }
  }

  async deleteMedia(id, entity) {
    try { //bora las peliculas/series
      const table = this.getTable(entity);
      const media = await table.destroy({
        where: {
          id
        }
      });
      if (media !== 1) throw new InvalidArgument('Nothing was deleted!');
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}