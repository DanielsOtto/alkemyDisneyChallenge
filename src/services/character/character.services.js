import { logger } from '../../config/pino.config.js';
import { CharacterAlreadyRegister } from '../../errors/CharacterAlreadyRegister.js';
import { InvalidArgument } from '../../errors/InvalidArgument.js';
import { CharUpdateValidations } from '../../validations/charUpdate.validations.js';
import { NewCharValidations } from '../../validations/newChar.validations.js';
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
      logger.error(e);
      throw e;
    }
  }

  async createChar({ image, name, age, weight, history }) {
    try {
      const char = await this.#characterRepo.getOneByName(name, false);
      char ? (() => { throw new CharacterAlreadyRegister(name); })() : null;
    } catch (e) {
      console.error(e);
      logger.error(e);
      throw e;
    }
    try {
      const validate = new NewCharValidations(image, name, age, weight, history);
      return await this.#characterRepo.createChar(validate);
    } catch (e) {
      console.error(e);
      logger.error(e);
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
      logger.error(e);
      throw e;
    }
  }
}
