import * as Sequelize from "sequelize";
import db from "../db";
import Ingredient from "./Ingredient";
import FoodIngredient from "./FoodIngredient";

/**
 * 2019.10.16 Made by Heo In
 * Food Table
 * id: 음식 ID
 * name: 음식 이름
 * serving: 음식의 양 ( 3인분 )
 * description : 음식 설명
 * image: 음식 사진 파일 경로
 * recipe: 음식 레시피 설명
 * user_id : (외래키) 음식을 등록한 사용자 Allow Null
 *
 * options (
 * 	timestamps : 자동적으로 createdAt, updatedAt 열을 생성하여 언제 수정되었는지 저장하는 옵션
 * 	underscored: column 이름을 camelCase로 할지 underscore 방식으로 할지 설정
 * 	freezeTableName : table name을 자동 변환하는 것을 막는다
 * )
 */

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

Food.associate = function associate() {
    Food.belongsToMany(Ingredient, {
        through: FoodIngredient,
        foreignKey: "food_id"
    });
}
export default Food;