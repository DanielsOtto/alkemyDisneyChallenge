import { logger } from '../../config/pino.config.js';
import sessionService from '../../services/session/index.js';


export class SessionController {

  async register({ body }, res, next) {
    try {
      const obj = await sessionService.register(body);
      res.status(201).header('Authorization', obj.token).json({ created: obj.user });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async authenticate({ body }, res, next) {
    try {
      const token = await sessionService.authenticate(body);
      res.status(200).header('Authorization', token).json({ Authorized: token });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}