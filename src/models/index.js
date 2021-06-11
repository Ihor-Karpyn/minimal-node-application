import Sequelize from 'sequelize-v5'
import {DATABASE, DATABASE_PASSWORD, DATABASE_USER} from '../utils/env';

const sequelize = new Sequelize(
  // process.env.DATABASE,
  // process.env.DATABASE_USER,
  // process.env.DATABASE_PASSWORD,
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
