import { DataTypes } from 'sequelize';
import db from '../database/sequelize.db.js';
import Character from './Character.js';
import Movie from './Movie.js';

const MovieCharacter = db.define('MovieCharacter', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }
}, {
  tableName: 'movies_characters'
});

Character.belongsToMany(Movie, {
  through: MovieCharacter,
  foreignKey: 'characterId'
});
Movie.belongsToMany(Character, {
  through: MovieCharacter,
  foreignKey: 'movieId'
});
export default MovieCharacter;