import sessionRepository from '../../repositories/session/index.js';
import { SessionService } from './session.services.js';

const sessionService = new SessionService(sessionRepository);
export default sessionService;