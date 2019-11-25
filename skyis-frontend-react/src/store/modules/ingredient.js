import { createAction, handleActions } from'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender} from "redux-pender";

import * as IngredientAPI from '../../lib/api/ingredient';

const SEARCH_INGREDIENT = 'ingredient/SEARCH_INGREDIENT';
const INSERT_INGREDIENT = 'ingredient/INSERT_INGREDIENT';


export const searchIngredient = createAction(SEARCH_INGREDIENT, IngredientAPI.searchIngredient);
export const insertIngredient = createAction(INSERT_INGREDIENT, IngredientAPI.insertIngredient);

const initialState = Map({
    ingredient: Map({}),
    status: 'READY'
});

export default handleActions({
    ...pender({
        type: SEARCH_INGREDIENT,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            console.log(fromJS(data));
            return state.set('ingredient', fromJS(data));
        }
    }),
    ...pender({
        type: INSERT_INGREDIENT,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state.set('ingredient', fromJS(data))
                        .set('status', 'SUCCESS');;
        },
        onFailure: (state, action) => {
            console.log(action);
            return state.set('status', action.payload.response.data.error)
                        .set('ingredient', Map({}));
        }
    })
}, initialState);