import { DataTypes } from 'sequelize';
import db from '../database/sequelize.db.js';


const Character = db.define('Character', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  history: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'characters'
});

export default Character;