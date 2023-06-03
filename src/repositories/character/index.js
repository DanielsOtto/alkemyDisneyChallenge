import Character from '../../models/Character.js';
import { CharacterRepository } from './character.repository.js';

const characterRepository = new CharacterRepository(Character);
export default characterRepository;