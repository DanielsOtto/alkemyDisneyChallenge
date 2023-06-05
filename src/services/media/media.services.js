import { logger } from '../../config/pino.config.js';
import { InvalidArgument } from '../../errors/InvalidArgument.js';
import { MediaUpdateValidations } from '../../validations/mediaUpdate.validations.js';
import { NewMediaValidations } from '../../validations/newMedia.validations.js';
import { AlreadyRegister } from '../../errors/AlreadyRegister.js';
import { NotFound } from '../../errors/NotFound.js';
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
      if (!id) throw new InvalidArgument('id');
      return await this.#mediaRepository.getMediaWithChars(id, entity);
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async getMediaByTitleAndGenre({ title, genre = false, order = false }, entity) {
    console.log(title);
    try {
      if (!title) throw new InvalidArgument('title');
      return await this.#mediaRepository.getMediaByTitleAndGenre(title, genre, order, entity)
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }

  async addCharacter(id, idC, entity) {
    try {
      if (!id) throw new InvalidArgument('id movie');
      if (!idC) throw new InvalidArgument('id character');
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
    let media;
    try {
      media = new NewMediaValidations(image, title, createDate, rating, genre);
      const mediaExist = await this.#mediaRepository.getMediaByTitle(title, entity, false);
      if (mediaExist) throw new AlreadyRegister(title);
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
    try {
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
      if (!id) throw new InvalidArgument('id');
      await this.#mediaRepository.deleteMedia(id, entity);
    } catch (e) {
      // logger.error(e);
      console.error(e);
      throw e;
    }
  }
}