import { Sequelize } from 'sequelize';

export default new Sequelize(process.env.DB_CONNECTION);
