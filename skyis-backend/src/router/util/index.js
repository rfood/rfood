import express from 'express';
import FoodType from '../../database/models/FoodType';
const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('querystring');
const router = express.Router();
import { Op } from 'sequelize';
import {Food, FoodIngredient, Ingredient} from "../../database/models";

router.post('/upload/food', (req, res) => {
    FoodType.findAll({
        attributes: ['id', 'name'],
    }).then(result => {
        let typeMap = new Array();
        for(let [key, value] of Object.entries(result)) {
            typeMap[value.name] = value.id;
        }
        for(let food of req.body.foodData) {
            if (typeMap[food.type] === null) food.type = 40;
            else food.type = typeMap[food.type];
        }
        Ingredient.findAll({
            attributes: ['id', 'code'],
        }).then(result => {
            let codeMap = new Array();
            for(let [key, value] of Object.entries(result)) {
                codeMap[value.code] = value.id;
            }
            req.body.ingredientData.forEach(function(item, index, arr) {
                item.forEach(function(_item, _index, _arr) {
                    _item.code = codeMap[_item.code] === null ? -1 : codeMap[_item.code];
                });
            })
            let foodPromise = [];

            req.body.foodData.forEach(function(item, index, arr) {
                console.log(item);
                if(item.name !== null) {
                    let newPromise = Food.create({ name: item.name, type: item.type, serving: item.serving, source: item.source });
                    foodPromise.push(newPromise);
                }
            });
            Promise.all(foodPromise).then(function(food) {
                let foodId = [], ingredientPromise = [] ;
                for(let [key, value] of Object.entries(food)) {
                    foodId.push(value.id);
                }
                console.log(req.body.ingredientData);
                req.body.ingredientData.some(function(item, index, arr){
                    item.forEach(function(_item, _index, _arr) {
                        let newPromise = FoodIngredient.create({food_id: foodId[index], ingredient_id: _item.code, ingredient_amount: _item.amount});
                        ingredientPromise.push(newPromise);
                    })
                })
                Promise.all(ingredientPromise).then(function(ingredient) {
                }).catch(error => {
                    console.log(error);
                    return res.status(500).send('Invalid Ingredients');
                })
            }).catch(error => {
                console.log(error);
                return res.status(500).send('Invalid Foods');
            })
            return res.status(200).send('All Data Insert Completed');
        });
    }).catch(err => {
        return res.status(500).send('Invalid Food Type');
        console.log(err);
    })
});

router.get('/image/:name', async (req, res) => {
    try {
        const res = await axios({
            url: `https://www.google.com/search?q=${qs.escape(req.params.name)}&tbm=isch`,
            method: 'GET',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0',
            }
        })
        const body = res.data;
        const $ = cheerio.load(body);
        const links = [];
        const meta = $('.rg_meta');
        let cnt = 0;
        meta.each((idx, el) => {
            if(++cnt <= 10) links.push(JSON.parse($(el).text()));
        });
        const regex = /\.(jpe?g|png|tif?f|bmp)/i;
        const urls = links.map(e => e.ou).filter(e => regex.exec(e));
        res.json(urls);
        res.send(urls);
        return res.status(200);
    } catch (error) {
        return res.status(500);
        console.log(error);
    }
})
export default router;