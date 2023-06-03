import mediaRepository from '../../repositories/media/index.js';
import characterRepository from '../../repositories/character/index.js';
import { MediaService } from './media.services.js';

const mediaService = new MediaService(mediaRepository, characterRepository);
export default mediaService;