import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as SearchAPI from '../../lib/api/search';

const SEARCH_INGREDIENT = 'ingredient/SEARCH_INGREDIENT';
const SEARCH_FOOD = 'ingredient/SEARCH_FOOD';

export const searchIngredient = createAction(SEARCH_INGREDIENT, SearchAPI.searchIngredient);
export const searchFood = createAction(SEARCH_FOOD, SearchAPI.searchFood);

const initialState = Map({
    ingredients: Map({}),
    food: Map({})
});

export default handleActions({
    ...pender({
        type: SEARCH_INGREDIENT,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('ingredients', fromJS(data));
        }
    }),
    ...pender({
        type: SEARCH_FOOD,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('food', fromJS(data));
        }
    }),
}, initialState);
