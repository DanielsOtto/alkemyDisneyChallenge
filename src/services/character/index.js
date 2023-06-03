import characterRepository from '../../repositories/character/index.js';
import { CharacterService } from './character.services.js';

const characterService = new CharacterService(characterRepository);
export default characterService;