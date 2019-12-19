import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as DailyIntakeAPI from '../../lib/api/dailyIntake';

const GET_DAILY_INTAKE = 'dailyIntake/GET_DAILY_INTAKE';

export const getDailyIntake = createAction(GET_DAILY_INTAKE, DailyIntakeAPI.getDailyIntake);

const initialState = Map({
    dailyIntake: Map({})
});

export default handleActions({
    ...pender({
        type: GET_DAILY_INTAKE,
        onSuccess: (state, action) => {
            const {data} = action.payload;
            return state.set('dailyIntake', fromJS(data));
        }
    })
}, initialState);