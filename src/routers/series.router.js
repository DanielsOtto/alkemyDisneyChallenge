import createRouter from '../utils/router.js';
import { auth } from '../middlewares/auth.middleware.js';
import serieEntity, { } from '../middlewares/serie.entity.js';
import mediaController from '../controllers/media/index.js';

const serieRouter = createRouter();

serieRouter.use(auth);
serieRouter.use(serieEntity);
serieRouter.post('/', mediaController.createMedia); // crear serie
serieRouter.put('/:id', mediaController.updateMedia); // modificar serie
serieRouter.delete('/:id', mediaController.deleteMedia); // eliminar serie
serieRouter.post('/:id/character', mediaController.addCharacter); // ADD characters a las series
serieRouter.get('/:id/character', mediaController.getMediaWithChars); // DETALLE 1 x id ? -- get all campos + personajes
serieRouter.get('/filter', mediaController.getMediaByTitleAndGenre); // 
//DETALLE 1 x title - FILTRAR x genre ++ ordenar x date AS o DES  - BIEN
export default serieRouter;