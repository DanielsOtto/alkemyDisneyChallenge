import { Op } from 'sequelize';
import { logger } from '../../config/pino.config.js';
import { EmptyCollection } from '../../errors/EmptyCollection.js';
import { InvalidArgument } from '../../errors/InvalidArgument.js';
import { NotFound } from '../../errors/NotFound.js';


export class CharacterRepository {
  #characterTable;
  constructor(charTable) {
    this.#characterTable = charTable;
  }

  async getAllChars() {
    try {// retorna todos los personajes
      const chars = await this.#characterTable.findAll({
        attributes: ['image', 'name']
      });
      !chars ? (() => { throw new EmptyCollection('character'); })() : null;
      return chars;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getMedia(char) {
    try { // retorna las peliculas/series de un personaje
      const movies = await char.getMovies();
      const series = await char.getSeries();
      return {
        movies,
        series
      };
    } catch (error) {
      logger.error(e);
      throw e;
    }
  }

  async getCharAndMedia(id) {
    try { //retorna un personaje y sus peliculas/series
      const char = await this.getOneById(id);
      const media = await this.getMedia(char);
      return {
        char,
        media
      };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getCharByNameAndFilter(name, age = false, weight = false) {
    try { // retorna todos los personajes por nombre + filtra por edad / peso + retorna sus peliculas/series
      const searchOptions = {// configura los filtros
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        }
      };
      if (age) {
        searchOptions.where.age = {
          [Op.like]: `%${age}%`
        };
      }
      if (weight) {
        const parsedWeight = parseFloat(weight);
        const weightThreshold = 0.5;
        searchOptions.where.weight = {
          [Op.gte]: parsedWeight - weightThreshold,
          [Op.lte]: parsedWeight + weightThreshold
        };
      }

      const chars = await this.#characterTable.findAll(searchOptions);
      if (chars.length === 0) throw new EmptyCollection('characters');
      let array = [];
      for (let c of chars) {
        const media = await this.getMedia(c);
        if (media) {
          array.push(media);
        }
      }
      return {
        chars,
        array
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getOneById(id) { // obtiene un personaje mediante su id
    try {
      const char = await this.#characterTable.findByPk(id);
      if (!char) throw new NotFound(id);
      return char;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getOneByName(name, validator = true, filter = false) {
    try { // obtiene un personaje mediante su nombre
      // si el validador se falsea no se comprueba si existe o no en la bd
      const queryOptions = {
        where: {
          name
        },
        attributes: filter ? [filter] : undefined, // config filtros
      };
      const char = await this.#characterTable.findOne(queryOptions);
      if (validator && !char) {
        throw new NotFound(name);
      }

      return char;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createChar({ image, name, age, weight, history }) {
    try { // guarda un personaje
      const char = await this.#characterTable.create({
        image,
        name,
        age,
        weight,
        history
      });
      !char ? (() => { throw new InvalidArgument('the character was not saved'); })() : null;
      return char;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateChar(id, { image, name, age, weight, history }) {
    try { // actualizar un personaje
      const char = await this.#characterTable.update({
        image,
        name,
        age,
        weight,
        history
      }, {
        where: {
          id
        }
      });
      if (char < 1) throw new InvalidArgument('id');
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteChar(id) {
    try { // borrar un personaje 
      const char = await this.#characterTable.destroy({
        where: {
          id
        }
      });
      if (char !== 1) throw new InvalidArgument('Nothing was deleted');
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

}