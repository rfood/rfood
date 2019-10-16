import * as Sequelize from "sequelize";
import db from "../db";

const FoodIngredient = db.define(
    'food_ingredient',
    {
        ingredient_amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'food_ingredient',
        comment: "음식 식재료 양 저장 테이블"
    }
);


export default FoodIngredient;