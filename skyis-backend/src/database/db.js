import { Sequelize } from 'sequelize'



require('dotenv').config();

const { MARIA_HOST, MARIA_PW, MARIA_USER } = process.env

const db = new Sequelize('skyis_db', MARIA_USER, MARIA_PW, {
    host: MARIA_HOST || '',
    dialect: 'mariadb',
    define: {
        underscored: true,
        collate: 'utf8_general_ci'
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000
    },
    timezone: "+09:00"
});
export default db;
