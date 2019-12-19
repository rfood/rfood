import * as Sequelize from "sequelize";
import db from "../db";

/**
 * 2019.10.16 Made by Heo In
 * Food Ingredient Table
 * food_id: 음식 ID
 * ingredient_id : 식재료 ID
 * ingredient_amount: 식재료 양
 *
 * options (
 * 	timestamps : 자동적으로 createdAt, updatedAt 열을 생성하여 언제 수정되었는지 저장하는 옵션
 * 	underscored: column 이름을 camelCase로 할지 underscore 방식으로 할지 설정
 * 	freezeTableName : table name을 자동 변환하는 것을 막는다
 * )
 */

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