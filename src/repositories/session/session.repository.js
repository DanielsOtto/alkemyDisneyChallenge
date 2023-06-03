import { logger } from '../../config/pino.config.js';
import { EmailAlreadyRegister } from '../../errors/EmailAlreadyRegister.js';
import { NotFound } from '../../errors/NotFound.js';

export class SesssionRepository {
  #sessionTable;
  constructor(sessTable) {
    this.#sessionTable = sessTable;
  }

  async createUser(email, password, name, lastname) {
    try {
      const user = await this.findByEmail(email, false);
      if (user) throw new EmailAlreadyRegister(email);
    } catch (e) {
      logger.error(e);
      throw e;
    }

    try {
      const newUser = await this.#sessionTable.create({
        email,
        password,
        name,
        lastname
      });

      return newUser;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async findByEmail(email, validate = true) {
    try {
      const user = await this.#sessionTable.findOne({
        where: {
          email: email
        }
      });
      if (validate) {
        if (!user) throw new NotFound(email);
      }
      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}