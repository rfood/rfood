import * as Sequelize from "sequelize";
import db from "../db";

/**
 * 2019.10.16 Made by Heo In
 * Nutrient Type Table
 * id: 영양소 분류 ID
 * name: 영양소 분류 이름 ( 일반성분, 아미노산, 지방산, 무기질, 비타민 ... )
 *
 * options (
 * 	timestamps : 자동적으로 createdAt, updatedAt 열을 생성하여 언제 수정되었는지 저장하는 옵션
 * 	underscored: column 이름을 camelCase로 할지 underscore 방식으로 할지 설정
 * 	freezeTableName : table name을 자동 변환하는 것을 막는다
 * )
 */

const FoodType = db.define(
    'food_type',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'food_type',
        comment: '영양소 분류 테이블 ( 일반성분, 비타민 ... )'
    }
);

export default FoodType;