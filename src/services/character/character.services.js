import { logger } from '../../config/pino.config.js';
import { InvalidArgument } from '../../errors/InvalidArgument.js';
import { CharUpdateValidations } from '../../validations/charUpdate.validations.js';
import { NewCharValidations } from '../../validations/newChar.validations.js';
import { AlreadyRegister } from '../../errors/AlreadyRegister.js';
import { InvalidFormat } from '../../errors/InvalidFormat.js';


export class CharacterService {
  #characterRepo;
  constructor(charRepo) {
    this.#characterRepo = charRepo;
  }

  async getAllChars() {
    try {// retorna todos los personajes
      return await this.#characterRepo.getAllChars();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getCharAndMedia(id) {
    try { // retorna todos los personajes con sus peliculas/series
      if (!id) throw new InvalidArgument('id');
      return await this.#characterRepo.getCharAndMedia(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getCharByNameAndFilter({ name, age, weight }) {
    try {// retorna todos los personajes por nombre + filtra por edad / peso + retorna sus peliculas/series
      if (typeof name !== 'string') throw new InvalidFormat('Name must be a string');
      if (!name) throw new InvalidArgument('name');
      return await this.#characterRepo.getCharByNameAndFilter(name, age, weight);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createChar({ image, name, age, weight, history }) {
    let char;
    try {  // valida los datos del personaje y que no exista en la db
      char = new NewCharValidations(image, name, age, weight, history);
      const charExist = await this.#characterRepo.getOneByName(name, false);
      charExist ? (() => { throw new AlreadyRegister(name); })() : null;
    } catch (e) {
      logger.error(e);
      throw e;
    }
    try {// guarda un personaje
      return await this.#characterRepo.createChar(char);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateChar(id, { image, name, age, weight, history }) {
    try { // actualiza un personaje
      if (!id) throw new InvalidArgument('id');
      const char = await this.#characterRepo.getOneById(id);
      const newChar = new CharUpdateValidations(char, image, name, age, weight, history);
      await this.#characterRepo.updateChar(id, newChar);
      return newChar; //retorna el personaje modificado
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteChar(id) {
    try {// elimina un personaje, requiere id por params
      if (!id) throw new InvalidArgument('id');
      await this.#characterRepo.deleteChar(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}
