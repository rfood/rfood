import * as Sequelize from "sequelize";
import db from "../db";

/**
 * 2019.10.16 Made by Heo In
 * Recommended Daily Amount
 * amount: 연령대, 영양소의 필요 양
 * standard_gender_age_id : (외래키) 성별, 나이대별 ID
 * nutrient_id : (외래키) 영양소 ID
 *
 * options (
 * 	timestamps : 자동적으로 createdAt, updatedAt 열을 생성하여 언제 수정되었는지 저장하는 옵션
 * 	underscored: column 이름을 camelCase로 할지 underscore 방식으로 할지 설정
 * 	freezeTableName : table name을 자동 변환하는 것을 막는다
 * )
 */

const RecommendedDailyAmount = db.define(
    'recommended_daily_amount',
    {
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'recommended_daily_amount',
        comment: '1일 권장량 테이블 ( 연령대, 영양소, 양 )'
    }
)