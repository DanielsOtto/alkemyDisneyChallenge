import { logger } from '../../config/pino.config.js';
import { InvalidArgument } from '../../errors/InvalidArgument.js';
import { CharUpdateValidations } from '../../validations/charUpdate.validations.js';
import { NewCharValidations } from '../../validations/newChar.validations.js';
import { AlreadyRegister } from '../../errors/AlreadyRegister.js';
// manejo de errores

export class CharacterService {
  #characterRepo;
  constructor(charRepo) {
    this.#characterRepo = charRepo;
  }

  async getAllChars() {
    try {
      return await this.#characterRepo.getAllChars();
    } catch (e) {
      console.error(e);
      // logger.error(e);
      throw e;
    }
  }

  async createChar({ image, name, age, weight, history }) {
    let char;
    try {
      char = new NewCharValidations(image, name, age, weight, history);
      const charExist = await this.#characterRepo.getOneByName(name, false);
      charExist ? (() => { throw new AlreadyRegister(name); })() : null;
    } catch (e) {
      console.error(e);
      // logger.error(e);
      throw e;
    }
    try {
      return await this.#characterRepo.createChar(char);
    } catch (e) {
      console.error(e);
      // logger.error(e);
      throw e;
    }
  }

  async updateChar(id, { image, name, age, weight, history }) {
    try {
      if (!id) throw new InvalidArgument('id');
      const char = await this.#characterRepo.getOneById(id);
      const newChar = new CharUpdateValidations(char, image, name, age, weight, history);
      await this.#characterRepo.updateChar(id, newChar);
    } catch (e) {
      console.error(e);
      // logger.error(e);
      throw e;
    }
  }

  async deleteChar(id) {
    try {
      if (!id) throw new InvalidArgument('id');
      await this.#characterRepo.deleteChar(id);
    } catch (e) {
      console.error(e);
      // logger.error(e);
      throw e;
    }
  }
}
