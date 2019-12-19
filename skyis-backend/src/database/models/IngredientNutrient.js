import * as Sequelize from "sequelize";
import db from '../db';
import NutrientType from "./NutrientType";
import StandardGenderAge from "./StandardGenderAge";
import RecommendedDailyAmount from "./RecommendedDailyAmount";
import Ingredient from "./Ingredient";
import Nutrient from "./Nutrient";

/**
 * 2019.10.16 Made by Heo In
 * IngredientNutrient Table
 * ingredient_id : (외래키) 식자재의 id
 * nutrient_id: (외래키) 영양소의 id ( 1: 에너지, 2: 탄수화물 ... )
 * nutrient_amount: 영양소의 양 ( float )
 *
 * options (
 * 	timestamps : 자동적으로 createdAt, updatedAt 열을 생성하여 언제 수정되었는지 저장하는 옵션
 * 	underscored: column 이름을 camelCase로 할지 underscore 방식으로 할지 설정
 * 	freezeTableName : table name을 자동 변환하는 것을 막는다
 * )
 */
const IngredientNutrient = db.define(
    'ingredient_nutrient',
    {
        nutrient_amount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'ingredient_nutrient',
        comment: '식자재별 영양소를 저장하는 테이블 ( 1(귀리), (1) 에너지, 100'
    }

)

export default IngredientNutrient;