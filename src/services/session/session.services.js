import { logger } from '../../config/pino.config.js';
import { generateToken } from '../../utils/auth.js';
import { Unauthorized } from '../../errors/Unauthorized.js';
import { comparePassword, encryptPassword } from '../../utils/hashPass.js';

export class SessionService {
  #sessionRepo
  constructor(sessionRepo) {
    this.#sessionRepo = sessionRepo;
  }

  async register({ name, lastname, email, password }) {
    try { // registro de usuario
      const pass = encryptPassword(password);
      const user = await this.#sessionRepo.createUser(email, pass, name, lastname);
      const token = generateToken(user);
      return {
        user,
        token
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async authenticate({ email, password }) {
    try { // autenticacion de usuario
      const user = await comparePassword(email, password);
      if (!user) throw new Unauthorized('Invalid credentials');
      return generateToken(user);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}
