import User from '../../models/User.js';
import { SesssionRepository } from './session.repository.js'


const sessionRepository = new SesssionRepository(User);
export default sessionRepository;