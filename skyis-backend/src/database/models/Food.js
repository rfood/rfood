import * as Sequelize from "sequelize";
import db from "../db";

const Food = db.define(
    'food',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        serving: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        description: Sequelize.STRING,
        image: Sequelize.STRING,
        recipe: Sequelize.STRING,
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'food',
        comment: '음식 정보 테이블'
    }
)

export default Food;