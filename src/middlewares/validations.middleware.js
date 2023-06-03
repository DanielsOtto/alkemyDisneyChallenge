import { logger } from '../config/pino.config.js';
import { UserValidations } from '../validations/user.validations.js';


export function validateUser({ body }, res, next) {
  try {
    new UserValidations(body);
    next();
  } catch (e) {
    logger.error(e);
    next(e);
  }
}