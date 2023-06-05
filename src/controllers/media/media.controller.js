import { logger } from '../../config/pino.config.js';
import mediaService from '../../services/media/index.js';
// SIRVE TANTO PARA MOVIES como SERIES


export class MediaController {

  async getAllMovies(req, res, next) {
    try { // retorna todas las peliculas
      const movies = await mediaService.getAllMovies();
      res.status(200).json({ Movies: movies });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getMediaWithChars({ entity, params }, res, next) {
    const { id } = params;
    try { // retorna pelicula/serie con sus personajes
      const media = await mediaService.getMediaWithChars(id, entity);
      res.status(200).json({ Media: media.media, Characters: media.characters });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getMediaByTitleAndGenre({ entity, query }, res, next) {
    try { // retorna la pelicula/seria por titulo 
      //filtra por genero, puede ordenarse de forma ascendente o descendente
      const media = await mediaService.getMediaByTitleAndGenre(query, entity);
      res.status(200).json({ Media: media });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async addCharacter({ entity, params, body }, res, next) {
    const { id } = params;
    const { idC } = body;
    try { // agrega un personaje a la pelicula/serie
      const char = await mediaService.addCharacter(id, idC, entity);
      res.status(200).json({ Added: char });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async createMedia({ body, entity }, res, next) {
    try { // guarda una pelicula / serie en la bd
      const media = await mediaService.createMedia(body, entity);
      res.status(201).json({ Created: media });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async updateMedia({ params, body, entity }, res, next) {
    const { id } = params;
    try { // actualiza una pelicula / serie 
      const updated = await mediaService.updateMedia(id, body, entity);
      res.status(200).json({ Update: updated });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async deleteMedia({ params, entity }, res, next) {
    const { id } = params;
    try { // borra una pelicula / serie
      await mediaService.deleteMedia(id, entity);
      res.status(200).json('Object deleted!');
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}