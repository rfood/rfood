import { createAction, handleActions } from'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender} from "redux-pender";

import * as IngredientAPI from '../../lib/api/ingredient';

const SEARCH_INGREDIENT = 'ingredient/SEARCH_INGREDIENT';

export const searchIngredient = createAction(SEARCH_INGREDIENT, IngredientAPI.searchIngredient);

const initialState = Map({
    ingredient: Map({})
});

export default handleActions({
    ...pender({
        type: SEARCH_INGREDIENT,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('ingredient', fromJS(data));
        }
    })
}, initialState);