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
    console.log(req.params.id);
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
            attributes: ['id', 'name_kor', 'unit'],
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
        console.log(result);
        if(result == null) result = [];
        res.json(result);
        return res.status(200);
    }).catch(err => {
        console.log(err);
    })
});

export default router;

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
    // 찾으려고 하는 Food ID와 일치하는 데이터를 Food와 FoodIngredient, IngredientNutrient를 조인해서 음식 영양소를 가져온다.
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
        let allNut = [], ret = {};
        ret["name"] = result.name;
        ret["nutrients"] = [];
        for(let ingredient of result.ingredients) {
            let am = ingredient.food_ingredient.ingredient_amount / 100;
            for(let nutrient of ingredient.nutrients) {
                if(allNut[nutrient.id] === undefined) {
                    allNut[nutrient.id] = {
                        "amount": 0,
                        "name_kor": "",
                        "unit": ""
                    }
                }
                allNut[nutrient.id].amount += nutrient.ingredient_nutrient.nutrient_amount * am;
                allNut[nutrient.id].name_kor = nutrient.name_kor;
                allNut[nutrient.id].unit = nutrient.unit;
            }
        }
        for(let nut of allNut) {
            if(nut === undefined) continue;
            ret["nutrients"].push(nut);
        }
        res.json(ret);
        return res.status(200);
    }).catch(err => {
        console.log(err);
    })
});



/**
 * Made by Heo In
 * 2019.10.21
 * Nutrient (Food)
 * Food의 Nutrient를 받아온다
 *
 * GET /api/nutrient/food/:id/:type
 * Param : { id: 50, type: 2 }
 *
 * Error Code
 *      1: BAD ID
 *
 */
router.get('/food/:id/:type', (req, res) => {
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

    // 찾으려고 하는 Food의 ID와 식재료 타입이 일치하는 데이터를 Food와 FoodIngredient, IngredientNutrient를 조인해서 음식 영양소를 가져온다.
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
                },
                where: {
                    nutrient_type_id: req.params.type
                }
            }]
        }],
        where: {id: req.params.id}
    }).then(result => {
        let allNut = [], ret = {};
        ret["name"] = result.name;
        ret["nutrients"] = [];
        for(let ingredient of result.ingredients) {
            let am = ingredient.food_ingredient.ingredient_amount / 100;
            for(let nutrient of ingredient.nutrients) {
                if(allNut[nutrient.id] === undefined) {
                    allNut[nutrient.id] = {
                        "amount": 0,
                        "name_kor": "",
                        "unit": ""
                    }
                }
                allNut[nutrient.id].amount += nutrient.ingredient_nutrient.nutrient_amount * am;
                allNut[nutrient.id].name_kor = nutrient.name_kor;
                allNut[nutrient.id].unit = nutrient.unit;
            }
        }
        for(let nut of allNut) {
            if(nut === undefined) continue;
            ret["nutrients"].push(nut);
        }
        res.json(ret);
        return res.status(200);
    }).catch(err => {
        return res.status(404);
        console.log(err);
    })
});