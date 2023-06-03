import { logger } from '../config/pino.config.js';
import { verifyToken } from '../utils/auth.js';
import { ForbiddenAccess } from '../errors/ForbiddenAcces.js';

export function auth(req, res, next) {
  let token;
  if (req.header('Authorization') && req.header('Authorization').startsWith('Bearer ')) {
    token = req.header('Authorization').substring(7); // Elimina los primeros 7 caracteres (incluyendo el espacio en blanco después de "Bearer")
  } else {
    token = req.header('Authorization');
  }

  console.log(token);
  try {
    if (!token) {
      throw new ForbiddenAccess();
    } else {
      const verified = verifyToken(token);
      req.user = verified;
      next();
    }
  } catch (e) {
    console.error(e);
    logger.error(e);
    next(e);
  }
}