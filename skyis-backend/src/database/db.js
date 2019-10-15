import { Sequelize } from 'sequelize'
require('dotenv').config();

const MARIA_USERE = (process.env.MARIA_USER === undefined ? '' : process.env.MARIA_USER)
const { MARIA_HOST, MARIA_PW } = process.env

const db = new Sequelize('skyis_db', MARIA_USERE, MARIA_PW, {
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
    }
})

export default db
