import { createAction, handleActions } from'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender} from "redux-pender";

import * as UtilAPI from '../../lib/api/util';

const UPLOAD_FOOD_DATA = 'util.UPLOAD_FOOD_DATA';
const SEARCH_IMAGE_WITH_URL = 'util.SEARCH_IMAGE_WITH_URL';

export const uploadFoodData = createAction(UPLOAD_FOOD_DATA, UtilAPI.uploadFoodData);
export const searchImageWithURL = createAction(SEARCH_IMAGE_WITH_URL, UtilAPI.searchImageWithURL);

const initialState = Map({
    status: '',
    message: '',
    imageURL: List([])
});

export default handleActions({
    ...pender({
        type: UPLOAD_FOOD_DATA,
        onSuccess: (state, action) => {
            const { data, status } = action.payload;
            if(status == 200) return state.set('status', 'SUCCESS').set('message', data);
            else return state.set('status', 'FAILED').set('message', data);
        },
        onFailure: (state, action) => {
            const { data, status } = action.payload;
            if(status == 200) return state.set('status', 'SUCCESS').set('message', data);
            else return state.set('status', 'FAILED').set('message', data);
        }
    }),
    ...pender({
        type: SEARCH_IMAGE_WITH_URL,
        onSuccess: (state, action) => {

        }
    })
}, initialState);