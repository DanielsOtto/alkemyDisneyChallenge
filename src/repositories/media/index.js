import Movie from '../../models/Movie.js';
import Serie from '../../models/Serie.js';
import { MediaRepository } from './media.repository.js';

const mediaRepository = new MediaRepository(Movie, Serie);
export default mediaRepository;