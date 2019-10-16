import * as Sequelize from 'sequelize'
import db from '../db'

import IngredientType from "./IngredientType";
import IngredientNutrient from "./IngredientNutrient";
import FoodIngredient from "./FoodIngredient";
import Nutrient from "./Nutrient";
import Food from "./Food";

/**
 * 2019.10.02 Made by Heo In
 * Ingredient Table
 * id: 식자재 ID
 * code: 식자재 Code
 * name: 식자재 이름
 *
 * options (
 * 	timestamps : 자동적으로 createdAt, updatedAt 열을 생성하여 언제 수정되었는지 저장하는 옵션
 * 	underscored: column 이름을 camelCase로 할지 underscore 방식으로 할지 설정
 * 	freezeTableName : table name을 자동 변환하는 것을 막는다
 * )
 */FoodIngredient
const Ingredient  = db.define(
    'ingredient',
    {
        id:  {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'ingredient',
        comment: '식자재 테이블 ( 귀리, 오트밀 ... )',
    }
);

Ingredient.associate = function associate() {
    Ingredient.belongsTo(IngredientType, {
        foreignKey: "ingredient_type_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    });
/*
    Ingredient.belongsTo(IngredientUnit, {
        foreignKey: "ingredient_unit_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    });
*/
    Ingredient.belongsToMany(Nutrient, {
        through: IngredientNutrient,
        foreignKey: "ingredient_id"
    });

    Ingredient.belongsToMany(Food, {
        through: FoodIngredient,
        foreignKey: "ingredient_id"
    });
}

export default Ingredient;

