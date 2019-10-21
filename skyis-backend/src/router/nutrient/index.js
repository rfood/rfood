import express from 'express';
const router = express.Router();
import {
    Nutrient,
    Ingredient,
    IngredientNutrient,
    Food, FoodIngredient
} from "../../database/models";

/**
 * Made by Heo In
 * 2019.10.21
 * Nutrient (Ingredient)
 * Ingredient의 Nutrient를 받아온다
 *
 * GET /api/nutrient/ingredient/:id
 * Param : { id: 50 }
 *
 * Error Code
 *      1: BAD ID
 *
 */
router.get('/ingredient/:id', (req, res) => {
    let numberRegex = /[^0-9]/g;
    if(numberRegex.test(req.params.id)) {
        return res.status(400).json({
            error: "BAD ID",
            code: 1
        });
    }
    Ingredient.findOne({
        attributes: ['name'],
        include: [{
            model: Nutrient,
            attributes: ['name_kor', 'unit'],
            through: {
                model: IngredientNutrient,
                attributes: ['nutrient_amount']
            }
        }],
        where: {id: req.params.id}
    }).then(result => {id
        res.json(result);
        return res.status(200);
    }).catch(err => {
        console.log(err);
    })
});

/**
 * Made by Heo In
 * 2019.10.21
 * Nutrient (Ingredient)
 * Ingredient의 Nutrient를 받아온다
 *
 * GET /api/nutrient/ingredient/:id/:type
 * Param : { id: 50, type: 1 }
 *
 * Type Code
 *      1: 일반성분
 *      2: 아미노산
 *      3: 지방산
 *      4: 콜레스테롤
 *      5: 식염
 *      6: 폐기율
 *      7: 무기질
 *      8: 비타민Ingredient의
 *
 * Error Code
 *      1: BAD ID
 *      2: BAD TYPE
 *
 */
router.get('/ingredient/:id/:type', (req, res) => {
    let numberRegex = /[^0-9]/g;
    if(numberRegex.test(req.params.id)) {
        return res.status(400).json({
            error: "BAD ID",
            code: 1
        });
    }
    if(numberRegex.test(req.params.type) || req.params.type < 1 || req.params.type > 8) {
        return res.status(400).json({
            error: "BAD TYPE",
            code: 2
        })
    }

    Ingredient.findOne({
        attributes: ['name'],
        include: [{
            model: Nutrient,
            attributes: ['name_kor', 'unit'],
            through: {
                model: IngredientNutrient,
                attributes: ['nutrient_amount']
            },
            where: {
                nutrient_type_id: req.params.type
            }
        }],
        where: {id: req.params.id}
    }).then(result => {
        res.json(result);
        return res.status(200);
    }).catch(err => {
        console.log(err);
    })
});

/**
 * Made by Heo In
 * 2019.10.21
 * Nutrient (Fod)
 * Food의 Nutrient를 받아온다
 *
 * GET /api/nutrient/food/:id
 * Param : { id: 50 }
 *
 * Error Code
 *      1: BAD ID
 *
 */
router.get('/food/:id', (req, res) => {
    let numberRegex = /[^0-9]/g;
    if(numberRegex.test(req.params.id)) {
        return res.status(400).json({
            error: "BAD ID",
            code: 1
        });
    }
    Food.findOne({
        attributes: ['name'],
        include: [{
            model: Ingredient,
            include: [{
                model: Nutrient,
                attributes: ['id', 'name_kor', 'unit'],
                through: {
                    model: IngredientNutrient,
                    attributes: ['nutrient_amount']
                }
            }]
        }],
        where: {id: req.params.id}
    }).then(result => {
        let allNut = {};
        allNut["name"] = result.name;
        allNut["nutrients"] = [];
        for(let ingredient in result.ingredients) {
            let am = result.ingredients[ingredient].food_ingredient.ingredient_amount / 100;
            for(let nutrient in result.ingredients[ingredient].nutrients) {
                if(allNut.nutrients[result.ingredients[ingredient].nutrients[nutrient].id] == null) {
                    allNut.nutrients[result.ingredients[ingredient].nutrients[nutrient].id] = {
                        "amount": 0,
                        "name_kor": "",
                        "unit": ""
                    }
                }
                console.log(result.ingredients[ingredient].nutrients[nutrient].ingredient_nutrient.nutrient_amount);
                allNut.nutrients[result.ingredients[ingredient].nutrients[nutrient].id].amount += result.ingredients[ingredient].nutrients[nutrient].ingredient_nutrient.nutrient_amount * am;
                allNut.nutrients[result.ingredients[ingredient].nutrients[nutrient].id].name_kor = result.ingredients[ingredient].nutrients[nutrient].name_kor;
                allNut.nutrients[result.ingredients[ingredient].nutrients[nutrient].id].unit = result.ingredients[ingredient].nutrients[nutrient].unit;
            }
        }
        console.log(allNut);
        res.json(result);
        return res.status(200);
    }).catch(err => {
        console.log(err);
    })
});

export default router;
