import { createAction, handleActions } from'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender} from "redux-pender";

import * as NutrientAPI from '../../lib/api/nutrient';

const SET_GENDER = 'nutrient/SET_GENDER';
const SET_AGE = 'nutrient/SET_AGE';
const SET_NUTRIENT_TYPE = 'nutrient/SET_NUTRIENT_TYPE';

const SEARCH_FOOD = 'nutrient/SEARCH_FOOD';
const GET_STANDARD = 'nutrient/GET_STANDARD';
const GET_FOOD_NUTRIENT = 'nutrient/GET_FOOD_NUTRIENT';
const GET_INGREDIENT_NUTRIENT = 'nutrient/GET_INGREDIENT_NUTRIENT';

export const setGender = createAction(SET_GENDER);
export const setAge = createAction(SET_AGE);
export const setNutrientType = createAction(SET_NUTRIENT_TYPE);

export const searchFood = createAction(SEARCH_FOOD, NutrientAPI.searchFood);
export const getStandard = createAction(GET_STANDARD, NutrientAPI.getStandardNutrient);
export const getFoodNutrient = createAction(GET_FOOD_NUTRIENT, NutrientAPI.getFoodNutrient);
export const getIngredientNutrient = createAction(GET_INGREDIENT_NUTRIENT, NutrientAPI.getIngredientNutrient);

const initialState = Map({
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
    }),
    ...pender({
        type: GET_INGREDIENT_NUTRIENT,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('nutrients', fromJS(data.nutrients));
        },
        onFailure: () => {
            console.log("FAILURE");
        }
    }),
    [SET_GENDER]: (state, action) => {
        return state.set('gender', fromJS(action.payload));
    },
    [SET_AGE]: (state, action) => {
        return state.set('age', fromJS(action.payload));
    },
    [SET_NUTRIENT_TYPE]: (state, action) => {
        return state.set('nutrientType', fromJS(action.payload));
    },
}, initialState);