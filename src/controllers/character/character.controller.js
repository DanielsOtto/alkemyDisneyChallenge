import { logger } from '../../config/pino.config.js';
import characterService from '../../services/character/index.js';

export class CharacterController {

  async getAllCharacters(req, res, next) {
    try { // retorna todos los personajes
      const chars = await characterService.getAllChars();
      res.status(200).json({ Characters: chars });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getCharAndMedia({ params }, res, next) {
    const { id } = params;
    try { // retorna todos los personajes con sus peliculas/series
      const charMedia = await characterService.getCharAndMedia(id);
      res.status(200).json({ Character: charMedia });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getCharByNameAndFilter({ query }, res, next) {
    try { // retorna todos los personajes por nombre + filtra por edad / peso + retorna sus peliculas/series
      const response = await characterService.getCharByNameAndFilter(query);
      res.status(200).json({ response });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async createCharacter({ body }, res, next) {
    try { // guarda un personaje
      const char = await characterService.createChar(body);
      res.status(201).json({ Character: char });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async updateCharacter({ body, params }, res, next) {
    const { id } = params;
    try { // actualiza un personaje, requiere id del personaje por params, datos a actualizar por body
      const updated = await characterService.updateChar(id, body);
      res.status(200).json({ Update: updated });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async deleteCharacter({ params }, res, next) {
    const { id } = params;
    try { // elimina un personaje, requiere id por params
      await characterService.deleteChar(id);
      res.status(200).json({ Deleted: id });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}