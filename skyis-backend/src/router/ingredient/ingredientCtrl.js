import Ingredient  from '../../database/models/Ingredient';
import Sequelize from "sequelize";
import db from '../../database/db';
import { getIngredients } from  '../../database/models/Ingredient';

const { Op } = Sequelize;

export const searchIngredient = async (ctx) => {
    console.log(ctx.params);

    const { name } = ctx.params;
    try {
        let ingredients = await getIngredients(name)
            .then(result => {
            ctx.body = (result);
        }).catch(err => {
            console.log(err);
        });
        console.log(ingredients);
        if(!ingredients.data) {
            ctx.status = 404;
            return;
        }
        ctx.body = {
            ...ingredients
        };
    } catch (e){
        console.log(e);
        return;
        //        ctx.throw(500, e);
    }
};
