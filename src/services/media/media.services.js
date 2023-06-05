import { logger } from '../../config/pino.config.js';
import { InvalidArgument } from '../../errors/InvalidArgument.js';
import { MediaUpdateValidations } from '../../validations/mediaUpdate.validations.js';
import { NewMediaValidations } from '../../validations/newMedia.validations.js';
import { AlreadyRegister } from '../../errors/AlreadyRegister.js';
// SIRVE TANTO PARA MOVIES como SERIES


export class MediaService {
  #mediaRepository;
  #characterRepository;
  constructor(mediaRepo, charRepo) {
    this.#mediaRepository = mediaRepo;
    this.#characterRepository = charRepo;
  }

  async getAllMovies() {
    try {// retorna todas las peliculas
      return await this.#mediaRepository.getAllMovies();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getMediaWithChars(id, entity) {
    try { // retorna pelicula/serie con sus personajes
      if (!id) throw new InvalidArgument('ID');
      return await this.#mediaRepository.getMediaWithChars(id, entity);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getMediaByTitleAndGenre({ title, genre = false, order = false }, entity) {
    console.log(title);
    try {// retorna la pelicula/seria por titulo 
      //filtra por genero, puede ordenarse de forma ascendente o descendente
      if (!title) throw new InvalidArgument('TITLE');
      return await this.#mediaRepository.getMediaByTitleAndGenre(title, genre, order, entity)
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async addCharacter(id, idC, entity) {
    try {// agrega un personaje a la pelicula/serie
      if (!id) throw new InvalidArgument('ID media');
      if (!idC) throw new InvalidArgument('ID character');
      const char = await this.#characterRepository.getOneById(idC);
      await this.#mediaRepository.addCharacters(id, char, entity);
      return char;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createMedia({ image, title, createDate, rating, genre }, entity) { // + valores del objeto
    let media;
    try { // guarda una pelicula/serie en la bd
      media = new NewMediaValidations(image, title, createDate, rating, genre);
      const mediaExist = await this.#mediaRepository.getMediaByTitle(title, entity, false); // verifica si fue guardada anteriormente
      if (mediaExist) throw new AlreadyRegister(title);
    } catch (e) {
      logger.error(e);
      throw e;
    }
    try {
      return await this.#mediaRepository.createMedia(media, entity);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateMedia(id, { image, title, createDate, rating, genre }, entity) { // + valores del object
    try { // actualiza una pelicula / serie
      if (!id) throw new InvalidArgument('ID');
      const media = await this.#mediaRepository.getMediaById(id, entity);
      const updated = new MediaUpdateValidations(media, image, title, createDate, rating, genre);
      await this.#mediaRepository.updateMedia(id, updated, entity);
      return updated;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteMedia(id, entity) {
    try { //borra una pelicula /serie
      if (!id) throw new InvalidArgument('ID');
      await this.#mediaRepository.getMediaById(id, entity);
      await this.#mediaRepository.deleteMedia(id, entity);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}