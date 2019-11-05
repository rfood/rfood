import express from 'express';
import Ingredient from "../../database/models/Ingredient";

const router = express.Router();
import { Op } from 'sequelize';

/**
 * Made by Heo In
 * Ingredient 식재료 추가
 *
 * POST /api/ingredient/
 * BODY SAMPLE: { "code": "T0290002600a", "name": "개미" }
 *
 * Error Code
 *      1: BAD NAME
 *      2: NAME EXIST
 *      3: CODE EXIST
 *
 */
router.post('/', (req, res) => {
    console.log(req.body.code);
    console.log(req.body.name);
    // Err 1 : 한글만 가능한 정규 표현식  https://intro0517.tistory.com/135
    let nameKorRegex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    if(nameKorRegex.test(req.body.name)) {
        return res.status(400).json({
            error: "BAD NAME",
            code: 1
        });
    }

    // Err 2 : 이름, 코드 중복 확인 및 Ingredient 추가
    Ingredient.findAll({
        attributes: ['id', 'code', 'name'],
        where: {
            [Op.or]: [{name: req.body.name}, {code: req.body.code}]
        }
    }).then(result => {
        console.log(result);
        // 중복이 있는
        if(result.length != 0){
            if(result[0].name === req.body.name) {
                return res.status(409).json({
                    error: "NAME EXISTS",
                    code: 2
                });
            } else if(result[0].code === req.body.code) {
                return res.status(409).json({
                    error: "CODE EXISTS",
                    code: 3
                });
            }
        } else {
            // 재료 추가
            Ingredient.create({ code: req.body.code, name: req.body.name })
                .then(result => {
                    res.json(result);
                });
            return res.status(200);
        }
    });
});

/**
 * Made by Heo In
 * Ingredient 식재료 조회
 *
 * GET /api/ingredient/:name
 *
 * Error Code
 *      1: BAD NAME
 **/
router.get('/:name', (req, res) => {
    // 한글만 가능한 정규식
    let nameKorRegex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    if(nameKorRegex.test(req.params.name)) {
        return res.status(400).json({
            error: "BAD NAME",
            code: 1
        });
    }

    Ingredient.findAll({
        attributes: ['id', 'code', 'name'],
        limit: 100,
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
});

/**
 * Made by Heo In
 * Ingredient 식재료 조회
 *
 * GET /api/ingredient/
 *
 * Error Code
 **/

router.get('/', (req, res) => {
    Ingredient.findAll({
        attributes: ['id', 'code', 'name'],
        limit: 100,
    }).then(result => {
        res.json(result);
        return res.status(200);
    }).catch(err => {
        console.log(err);
    })
})

export default router;