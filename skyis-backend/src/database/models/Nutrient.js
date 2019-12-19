import * as Sequelize from "sequelize";
import db from "../db";
import RecommendedDailyAmount from "./RecommendedDailyAmount";
import StandardGenderAge from "./StandardGenderAge";
import NutrientType from "./NutrientType";
import Ingredient from "./Ingredient";
import IngredientNutrient from "./IngredientNutrient";
import Food from "./Food";
import FoodNutrient from "./FoodNutrient";
/**
 * 2019.10.16 Made by Heo In
 * Nutrient Table
 * id: 영양소 ID
 * name_kor: 영양소 한글이름
 * name_eng: 영양소 영어이름
 * unit: 단위 (kcal, g, mg, ug)
 * nutrient_type_id: (외래키) 영양성분 분류 ( 일반성분, 비타민, 무기질 ... )
 *
 * options (
 * 	timestamps : 자동적으로 createdAt, updatedAt 열을 생성하여 언제 수정되었는지 저장하는 옵션
 * 	underscored: column 이름을 camelCase로 할지 underscore 방식으로 할지 설정
 * 	freezeTableName : table name을 자동 변환하는 것을 막는다
 * )
 */

const Nutrient = db.define(
    'nutrient',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_kor: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name_eng: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        unit: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'nutrient',
        comment: '영양 성분 데이터베이스 에너지, 탄, 단, 지 ... '
    }
);

Nutrient.associate = function associate() {
    Nutrient.belongsTo(NutrientType, {
        foreignKey: "nutrient_type_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    });

    Nutrient.belongsToMany(StandardGenderAge, {
        through: RecommendedDailyAmount,
        foreignKey: "nutrient_id"
    });

    Nutrient.belongsToMany(Ingredient, {
        through: IngredientNutrient,
        foreignKey: "nutrient_id"
    });
    Nutrient.belongsToMany(Food, {
        through: FoodNutrient,
        foreignKey: "nutrient_id"
    });
}


export default Nutrient;
