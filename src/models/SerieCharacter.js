import { DataTypes } from 'sequelize';
import db from '../database/sequelize.db.js';
import Character from './Character.js';
import Serie from './Serie.js';

const SerieCharacter = db.define('SerieCharacter', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }
}, {
  tableName: 'series_characters'
});

Character.belongsToMany(Serie, {
  through: SerieCharacter,
  foreignKey: 'charId'
});
Serie.belongsToMany(Character, {
  through: SerieCharacter,
  foreignKey: 'serieId'
});
export default SerieCharacter;