import bcrypt from 'bcrypt';
import { HASH_SECRET } from '../config/config.js';
import { logger } from '../config/pino.config.js';
import sessionRepository from '../repositories/session/index.js';


export function encryptPassword(password) {
  return bcrypt.hashSync(password, HASH_SECRET);
}

export async function comparePassword(email, password) {
  try {
    const user = await sessionRepository.findByEmail(email, false);
    if (!user) {
      return null;
    }
    const validatePass = bcrypt.compareSync(password, user.password);
    if (!validatePass) {
      return null;
    }
    return user;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}