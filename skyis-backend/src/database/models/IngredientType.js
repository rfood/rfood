import * as Sequelize from 'sequelize'
import db from '../db'

/**
 * 2019.10.16 Made by Heo In
 * IngredientType Table
 * id: 식자재 분류 ID
 * name: 식자재 분류 이름 ( 밥, 빵, 과자, 면 ... )
 *
 * options (
 * 	timestamps : 자동적으로 createdAt, updatedAt 열을 생성하여 언제 수정되었는지 저장하는 옵션
 * 	underscored: column 이름을 camelCase로 할지 underscore 방식으로 할지 설정
 * 	freezeTableName : table name을 자동 변환하는 것을 막는다
 * )
 */
const IngredientType  = db.define(
    'ingredient-type',
    {
        id:  {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'ingredient_type',
        comment: '식자재 분류 테이블 ( 밥, 빵, 과자, ... )',
    }
);

export default IngredientType;



