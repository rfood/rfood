import * as express from 'express';
import {
    Food, FoodIngredient
} from "../../database/models";
import {Op} from "sequelize";

const router = express.Router();

/**
 * Made by Heo In
 * Food 음식 조회
 *
 * GET /api/food/
 *
 * Error Code
 **/
router.get('/', (req, res) => {
    Food.findAll({
        attributes: ['id', 'name', 'serving', 'description'],
        limit: 100,
    }).then(result => {
        res.json(result);
        return res.status(200);
    }).catch(err => {
        console.log(err);
    })
})

/**
 * Made by Heo In
 * Food 음식 조회
 *
 * GET /api/food/:name
 *
 * Error Code
 *      1: BAD NAME
 **/
router.get('/:name', (req, res) => {
    let nameKorRegex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    if(nameKorRegex.test(req.params.name)) {
        return res.status(400).json({
            error: "BAD NAME",
            code: 1
        });
    }

    Food.findAll({
        attributes: ['id', 'name', 'serving', 'description'],
        limit: 10,
        where: {
            name: {
                [Op.substring]: req.params.name
            }
        }
    }).then(result => {
        res.json(result);
        return res.status(200);
    }).catch(err => {
        console.log(err);
    })
})

/**
 * Made by HeoIn
 * Food 기본 정보 등록
 *
 * POST /api/food
 *      body
 *      {
 *          "name": "음식이름",
 *          "serving": "인분수",
 *          "description": "설명",
 *          "ingredients": [
 *              {"id": 321, "amount": 200},
 *              {"id": 320, "amount": 20}
 *          ]
 *      }
 *
 * ERROR CODE
 *      1: BAD NAME ( 한글로 제한 )
 *      2: BAD SERVING ( 숫자가 아닌지, 1만보다 큰지 )
 */
router.post('/', (req, res) => {
    // Err 1 : 음식 이름 한글인지 체크
    console.log(req.body.name);
    let nameKorRegex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    if(nameKorRegex.test(req.body.name)) {
        return res.status(400).json({
            error: "BAD NAME",
            code: 1
        });
    }
    // Err 2 : 인분 수 숫자인지 체크

    let numberRegex = /[^0-9]/g;
    if(numberRegex.test(req.body.serving) || req.body.serving > 10000) {
        return res.status(400).json({
            error: "BAD SERVING",
            code: 2
        });
    }

    Food.create({ name: req.body.name, serving: req.body.serving, description: req.body.description})
        .then(result => {
            let id = result.id;
            res.json(result);
            for(let ing in req.body.ingredients) {
                FoodIngredient.create({ food_id: result.id, ingredient_id: req.body.ingredients[ing].id, ingredient_amount: req.body.ingredients[ing].amount})
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(409);
                    })
            }
            res.status(200);
        })
        .catch(err => {
            console.log(err);
            return res.status(409);
        });
    return res.status(200);
});



router.get('/ingredient/:id', (req, res) => {
    const { id } = req.params.id;
    let numberRegex = /[^0-9]/g;
    console.log(id);
    if(numberRegex.test(id)) {
        return res.status(400).json({
            error: 'BAD ID',
            code: 1
        })
    }
    FoodIngredient.findAll({
        attributes: ['ingredient_id', 'ingredient_amount'],
        where: {
            food_id: id
        }
    }).then(result => {
        res.json(result);
        return res.status(200);
    })
})
router.get('/', (req, res) => {
    res.send('food');
})

export default router;
