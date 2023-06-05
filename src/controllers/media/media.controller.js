import { logger } from '../../config/pino.config.js';
import mediaService from '../../services/media/index.js';
// SIRVE TANTO PARA MOVIES como SERIES

export class MediaController {

  async getAllMovies(req, res, next) {
    try {
      const movies = await mediaService.getAllMovies();
      res.status(200).json({ Movies: movies });
    } catch (e) {
      // logger.error(e);
      console.error(e);
      next(e);
    }
  }

  async getMediaWithChars({ entity, params }, res, next) {
    const { id } = params;
    try {
      const media = await mediaService.getMediaWithChars(id, entity);
      res.status(200).json({ Media: media.media, Characters: media.characters });
    } catch (e) {
      // logger.error(e);
      console.error(e);
      next(e);
    }
  }

  // async getMediaByTitleAndGenre({ entity, params }, res, next) {
  async getMediaByTitleAndGenre({ entity, query }, res, next) {
    try {
      const media = await mediaService.getMediaByTitleAndGenre(query, entity);
      res.status(200).json({ Media: media });
    } catch (e) {
      // logger.error(e);
      console.error(e);
      next(e);
    }
  }

  async addCharacter({ entity, params, body }, res, next) {
    const { id } = params;
    const { idC } = body;
    try {
      const char = await mediaService.addCharacter(id, idC, entity);
      res.status(200).json({ Added: char });
    } catch (e) {
      console.error(e);
      // logger.error(e);
      next(e);
    }
  }

  async createMedia({ body, entity }, res, next) {
    try {
      const media = await mediaService.createMedia(body, entity);
      res.status(201).json({ Created: media });
    } catch (e) {
      // logger.error(e);
      console.error(e);
      next(e);
    }
  }

  async updateMedia({ params, body, entity }, res, next) {
    const { id } = params;
    try {
      const updated = await mediaService.updateMedia(id, body, entity);
      res.status(200).json({ Update: updated });
    } catch (e) {
      // logger.error(e);
      console.error(e);
      next(e);
    }
  }

  async deleteMedia({ params, entity }, res, next) {
    const { id } = params;
    try {
      await mediaService.deleteMedia(id, entity);
      res.status(200).json('Object deleted!');
    } catch (e) {
      // logger.error(e);
      console.error(e);
      next(e);
    }
  }
}