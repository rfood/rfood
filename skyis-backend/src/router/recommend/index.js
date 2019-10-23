import * as express from 'express';
import {Nutrient, RecommendedDailyAmount, StandardGenderAge} from "../../database/models";

const router = express.Router();

router.get('/:id/:type', (req, res) => {
    let numberRegex = /[^0-9]/g;
    if(numberRegex.test(req.params.id)) {
        return res.status(400).json({
            error: "BAD TYPE",
            code: 1
        });
    }

    if(numberRegex.test(req.params.type) || req.params.type < 0 || req.params.type > 8) {
        return res.status(400).json({
            error: "BAD TYPE",
            code: 2
        });
    }

    StandardGenderAge.findAll({
        include: [{
            model: Nutrient,
            attributes:["id", "name_kor"],
            through: {
                model: RecommendedDailyAmount,
                attributes: ["amount"]
            },
            where: {
                nutrient_type_id: req.params.type
            }
        }],
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
        return res.status(200);
    }).catch(err => {
        return res.status(404);
    })
});

export default router;
