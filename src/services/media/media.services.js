import { logger } from '../../config/pino.config.js';
import { InvalidArgument } from '../../errors/InvalidArgument.js';
import { MediaUpdateValidations } from '../../validations/mediaUpdate.validations.js';
import { NewMediaValidations } from '../../validations/newMedia.validations.js';
//errores

export class MediaService {
  #mediaRepository;
  #characterRepository;
  constructor(mediaRepo, charRepo) {
    this.#mediaRepository = mediaRepo;
    this.#characterRepository = charRepo;
  }

  async getAllMovies() {
    try {
      return await this.#mediaRepository.getAllMovies();
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async getMediaWithChars(id, entity) {
    try {
      return await this.#mediaRepository.getMediaWithChars(id, entity);
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async getMediaByTitleAndGenre({ title, genre = false, order = false }, entity) {
    try {
      return await this.#mediaRepository.getMediaByTitleAndGenre(title, genre, order, entity)
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async addCharacter(id, idC, entity) {
    try {
      const char = await this.#characterRepository.getOneById(idC);
      await this.#mediaRepository.addCharacters(id, char, entity);
      return char;
    } catch (e) {
      console.error(e);
      // logger.error(e);
      throw e;
    }
  }

  async createMedia({ image, title, createDate, rating, genre }, entity) { // + valores del objeto
    try {
      const media = await this.#mediaRepository.getMediaByTitle(title, entity, false);
      if (media) throw new Error('REPETIDO') // MODIFICAR
    } catch (e) {
      logger.error(e);
      console.error(e);
      throw e;
    }
    try {
      const media = new NewMediaValidations(image, title, createDate, rating, genre);
      return await this.#mediaRepository.createMedia(media, entity);
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async updateMedia(id, { image, title, createDate, rating, genre }, entity) { // + valores del object
    try {
      if (!id) throw new InvalidArgument('id');
      const media = await this.#mediaRepository.getMediaById(id, entity);
      const updated = new MediaUpdateValidations(media, image, title, createDate, rating, genre);
      await this.#mediaRepository.updateMedia(id, updated, entity);
      return updated;
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async deleteMedia(id, entity) {
    try {
      await this.#mediaRepository.deleteMedia(id, entity);
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }
}