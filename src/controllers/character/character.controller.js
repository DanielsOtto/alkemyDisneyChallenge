import { logger } from '../../config/pino.config.js';
import characterService from '../../services/character/index.js';

export class CharacterController {

  async getAllCharacters(req, res, next) {
    try {
      const chars = await characterService.getAllChars();
      res.status(200).json({ Characters: chars });
    } catch (e) {
      console.error(e);
      logger.error(e);
      next(e);
    }
  }// sin probar sin swagger

  async createCharacter({ body }, res, next) {
    try {
      const char = await characterService.createChar(body);
      res.status(201).json({ Character: char });
    } catch (e) {
      console.error(e);
      logger.error(e);
      next(e);
    }
  } // sin probar sin swagger

  async updateCharacter({ body, params }, res, next) {
    const { id } = params;
    try {
      await characterService.updateChar(id, body);
      res.status(200).json('Updated');
    } catch (e) {
      console.error(e);
      // logger.error(e);
      next(e);
    }
  }// sin probar sin swagger

  async deleteCharacter({ params }, res, next) {
    const { id } = params;
    try {
      await characterService.deleteChar(id);
      res.status(200).json({ Deleted: id });
    } catch (e) {
      console.error(e);
      logger.error(e);
      next(e);
    }
  }//sin probar sin swagger
}