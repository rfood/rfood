import * as express from 'express';
import {Nutrient, RecommendedDailyAmount, StandardGenderAge} from "../../database/models";

const router = express.Router();

/**
 * Made by Heo In
 * 2019.10.21
 * Recommend
 * 일일 섭취량 정보를 가져온다.
 *
 * GET /api/Recommend
 *
 * Error Code
 *      1: BAD ID
 *
 */

router.get('/', (req, res) => {
    StandardGenderAge.findAll({
        include: [{
            model: Nutrient,
            attributes:["id", "name_kor"],
            through: {
                model: RecommendedDailyAmount,
                attributes: ["amount"]
            },
        }],
    }).then(result => {
        res.json(result);
        return res.status(200);
    }).catch(err => {
        return res.status(404);
    })
});

export default router;
