import createRouter from '../utils/router.js';
import characterController from '../controllers/character/index.js';
import { auth } from '../middlewares/auth.middleware.js';

const characterRouter = createRouter();

characterRouter.use(auth);
characterRouter.get('/', characterController.getAllCharacters); // mostrar TODOS los personajes image & name
characterRouter.get('/:id/media', characterController.getCharAndMedia); // mostrar 1 personaje todos sus atributos + peliculas y series
// characterRouter.get('/', ); // buscar por nombre /+/ filtrar x peso * edad movies/series
characterRouter.post('/', characterController.createCharacter); // create character
characterRouter.put('/:id', characterController.updateCharacter); // modificar character
characterRouter.delete('/:id', characterController.deleteCharacter); // delete
export default characterRouter;