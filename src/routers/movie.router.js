import { auth } from '../middlewares/auth.middleware.js';
import createRouter from '../utils/router.js';
import movieEntity from '../middlewares/movie.entity.js';
import mediaController from '../controllers/media/index.js';


const movieRouter = createRouter();

movieRouter.use(auth);
movieRouter.use(movieEntity);
movieRouter.post('/', mediaController.createMedia); // CREAR 1 --  BIEN
movieRouter.get('/', mediaController.getAllMovies); // get all movies - BIEN
movieRouter.put('/:id', mediaController.updateMedia); // EDITAR 1 -- BIEN
movieRouter.delete('/:id', mediaController.deleteMedia); // ELIMINAR 1 -- BIEN
movieRouter.post('/:id/character', mediaController.addCharacter)// para agregar personajes a la movie -- SIN HACER
movieRouter.get('/:id/character', mediaController.getMediaWithChars); // DETALLE 1 x id ? -- get all campos + personajes
movieRouter.get('/filter', mediaController.getMediaByTitleAndGenre); // listado -- get img/title/dateCreate 
//DETALLE 1 x title - FILTRAR x genre ++ ordenar x date AS o DES  - BIEN
export default movieRouter;