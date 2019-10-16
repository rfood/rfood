import * as express from 'express';
import FoodIngredient from "../../database/models";

const router = express.Router();

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
