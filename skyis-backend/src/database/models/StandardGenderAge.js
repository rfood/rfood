import * as Sequelize from "sequelize";
import db from "../db";
import Nutrient from "./Nutrient";
import RecommendedDailyAmount from "./RecommendedDailyAmount";
import Ingredient from "./Ingredient";

/**
 * 2019.10.16 Made by Heo In
 * Standard Gender Age 테이블
 * id: 성별,연령대 Id
 * gender: 남성, 여성
 * age: 10대, 20대 ... 1~2세 ..
 *
 * options (
 * 	timestamps : 자동적으로 createdAt, updatedAt 열을 생성하여 언제 수정되었는지 저장하는 옵션
 * 	underscored: column 이름을 camelCase로 할지 underscore 방식으로 할지 설정
 * 	freezeTableName : table name을 자동 변환하는 것을 막는다
 * )
 */

const StandardGenderAge = db.define(
    'standard_gender_age',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'standard_gender_age',
        comment: '성별 및 연령대 테이블 ( 남성 10대 ... ) '
    }
);

StandardGenderAge.associate = function associate() {
    StandardGenderAge.belongsToMany(Nutrient, {
        through: RecommendedDailyAmount,
        foreignKey: "standard_gender_age_id",
    });
}
export default StandardGenderAge;