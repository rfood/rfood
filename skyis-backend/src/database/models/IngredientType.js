import * as Sequelize from 'sequelize'
import db from '../db'

/**
 * 2019.10.04 Made by Heo In
 * IngredientType Table
 * id: 식자재 분류 ID
 * name: 식자재 분이름
 * fk_ingredient_type_id: ingredient_type 외래키 / 식자재 부류를 나누었다. (고기, 생선 .. )
 * fk_ingredient_unit_id: ingredient_unit 외래키 / 식자재 단위를 나누었다. (g .. 말, 큰술)
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
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: Sequelize.STRING,
        fk_ingredient_type_id: Sequelize.INTEGER,
        fk_ingredient_unit_id: Sequelize.INTEGER
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        indexes: [
            {
                fields: ['fk_ingredient_type_id', 'fk_ingredient_unit_id']
            }
        ],
        tableName: 'ingredient',
        comment: '식자재 기준 데이터베이스로 식자재의 종류를 볼 수 있다',
    }
);

export default IngredientType;



