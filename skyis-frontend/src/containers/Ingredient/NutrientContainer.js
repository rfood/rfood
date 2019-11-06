import React, { Component }  from 'react';
import GenderAge from "../../components/Nutrient/GenderAge";
import NutrientType from "../../components/Nutrient/NutrientType";
import NutrientTable from "../../components/Nutrient/NutrientTable";
import NutrientChart from "../../components/Nutrient/NutrientChart";
import { connect } from 'react-redux';
import { bindActionCreators} from "redux";
import * as nutrientActions from '../../store/modules/nutrient';
import {Map} from "immutable";

class NutrientContainer extends Component {
    state = {
        gender: 0,
        age: 0,
        type: 0,
    }
    handleGenderClick = (num) => {
        this.setState(
            {gender: num}
        )
    }

    handleAgeClick = (num) => {
        this.setState(
            {age: num}
        )
    }

    handleTypeClick = (num) => {
        this.setState(
            {type:  num}
        )
    }

    render() {
        return(
            <React.Fragment>
                <GenderAge/>
                <NutrientType/>
                <NutrientChart/>
                <NutrientTable/>
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({
        nutrients: state.nutrient.get('nutrients'),
        recommend: state.nutrient.get('recommend'),
        food: state.nutrient.get('food'),
    }),
    (dispatch) => ({
        NutrientActions: bindActionCreators(nutrientActions, dispatch)
    })
) (NutrientContainer);
