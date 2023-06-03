import sessionController from '../controllers/session/index.js';
import { validateUser } from '../middlewares/validations.middleware.js';
import createRouter from '../utils/router.js';

const sessionRouter = createRouter();

sessionRouter.post('/register', validateUser, sessionController.register);
sessionRouter.post('/authenticate', validateUser, sessionController.authenticate);

export default sessionRouter;