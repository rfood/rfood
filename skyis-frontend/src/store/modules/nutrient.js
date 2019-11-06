import { createAction, handleActions } from'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender} from "redux-pender";

import * as NutrientAPI from '../../lib/api/nutrient';

const SEARCH_FOOD = 'nutrient/SEARCH_FOOD';
const GET_STANDARD = 'nutrient/GET_STANDARD';
const GET_FOOD_NUTRIENT = 'nutrient/GET_FOOD_NUTRIENT';

export const searchFood = createAction(SEARCH_FOOD, NutrientAPI.searchFood);
export const getStandard = createAction(GET_STANDARD, NutrientAPI.getStandardNutrient);
export const getFoodNutrient = createAction(GET_FOOD_NUTRIENT, NutrientAPI.getFoodNutrient);

const initialState = Map({
    gender: 0,
    age: 0,
    type: 0,
    nutrients: Map({}),
    recommend: Map({}),
    food: Map({})
});

export default handleActions({
    ...pender({
        type: SEARCH_FOOD,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('food', fromJS(data));
        }
    }),
    ...pender({
        type: GET_STANDARD,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('recommend', fromJS(data));
        }
    }),
    ...pender({
        type: GET_FOOD_NUTRIENT,
        onSuccess: (state, action) => {
            const { data }  =action.payload;
            return state.set('nutrients', fromJS(data));
        }
    })
}, initialState);