import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { logger } from '../config/pino.config.js';
import specs from '../config/swagger.config.js';
import db from '../database/sequelize.db.js';
import movieRouter from '../routers/movie.router.js';
import sessionRouter from '../routers/session.router.js';
import characterRouter from '../routers/character.router.js';
import { errorMiddleware } from '../middlewares/error.middleware.js';
import { errorHandler } from '../middlewares/errorHandler.middleware.js';
import MovieCharacter from '../models/MovieCharacters.js';
import SerieCharacter from '../models/SerieCharacter.js';
// index configurado -

export class Server {
  #app;
  #server;
  constructor() {
    this.#app = express();

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.sync();
      logger.info('Database online!');
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message); // manejador de errores ?
    }
  }

  middlewares() {
    this.#app.use(morgan('dev'));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.#app.use('/api/sessions', sessionRouter); //#1
    this.#app.use('/api/characters', characterRouter); //#2
    this.#app.use('/api/movies', movieRouter); //#3 movie
    // this.#app.use() #4 series
    this.#app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    this.#app.use(errorMiddleware, errorHandler);
    // this.#app.use() -- rutas erroneas
  }

  async connect(port) {
    return new Promise((resolve, reject) => {
      this.#server = this.#app.listen(port, () => {
        logger.info(`Connect in the port ${port}`);
        resolve(port);
      });
      this.#server.on('error', e => {
        logger.error(`ERROR when trying to connect to ${port}`);
        reject(e);
      })
    });
  }

  async disconnect(port) {
    return new Promise((resolve, reject) => {
      this.#server.close(e => {
        if (e) {
          logger.error(`ERROR when trying to disconnect to ${port}`);
          reject(e);
        } else {
          resolve(e);
        }
      });
    });
  }
}