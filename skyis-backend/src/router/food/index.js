import * as express from 'express';
import {
    Food
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
