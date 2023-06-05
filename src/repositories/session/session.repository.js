import { logger } from '../../config/pino.config.js';
import { AlreadyRegister } from '../../errors/AlreadyRegister.js';
import { NotFound } from '../../errors/NotFound.js';

export class SesssionRepository {
  #sessionTable;
  constructor(sessTable) {
    this.#sessionTable = sessTable;
  }

  async createUser(email, password, name, lastname) {
    try { // guarda usuario en la bd
      const user = await this.findByEmail(email, false);
      if (user) throw new AlreadyRegister(email);
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
    try { //busca usuario en la bd
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