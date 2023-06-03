import { PORT } from '../config/config.js';
import createServer from '../server/index.js';
import { logger } from '../config/pino.config.js';

const server = createServer();

try {
  await server.connect(PORT);
} catch (e) {
  console.error(e); // sacar al final
  logger.error(e);
}