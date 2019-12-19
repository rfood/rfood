import React, { Component } from 'react';
import NutrientTemplate from "../../components/Nutrient/NutrientTemplate";
import {InputAndButton} from "../../components/Common/InputAndButton";
import { connect } from 'react-redux';
import { bindActionCreators} from "redux";
import NutrientSearchModal from "../../components/Nutrient/NutrientSearchModal";
import GenderAge from "../../components/Nutrient/GenderAge";
import NutrientType from "../../components/Nutrient/NutrientType";

import * as nutrientActions from '../../store/modules/nutrient';
import * as searchActions from '../../store/modules/search';
import * as dailyIntakeActions from '../../store/modules/dailyIntake';

import NutrientTable from "../../components/Nutrient/NutrientTable";

class NutrientContainerWithHook extends Component {
    state = {
        open: false,
        selectedIngredientId: -1,
        selectedGender: 0,
        selectedAge : 0,
        selectedType: 0,
    }

    awaitGetIngredientNutrient = async( ingredientId, nutrientType ) => {
        try {
            await this.props.NutrientActions.getIngredientNutrient(ingredientId, nutrientType);
        } catch(e) {
            console.log(e);
        }
    }

    awaitGetDailyIntake = async( ) => {
        try {
            await this.props.DailyIntakeActions.getDailyIntake(this.state.selectedGender * 5 + this.state.selectedAge + 1, this.state.selectedType);
        } catch(e) {
            console.log(e);
        }
    }

    handleTypeClick = (event, type) => {
        this.setState({
            selectedType: type
        })
        this.awaitGetIngredientNutrient(this.state.selectedIngredientId, type);
        this.awaitGetDailyIntake();
    }
    handleGenderClick = (event, gender) => {
        this.setState({
            selectedGender: gender
        });
        this.awaitGetDailyIntake();
    }

    handleAgeClick = (event, age) => {
        this.setState({
            selectedAge: age
        });
        this.awaitGetDailyIntake();
    }

    handleSubmit = (event, input) => {
        const awaitSearchIngredient = async( {input} ) => {
            const { SearchActions } = this.props;
            try {
                this.setState({
                    open: true,
                })
                await SearchActions.searchIngredient(input);
            } catch(e) {
                console.log(e);
            }
        }
        awaitSearchIngredient(input);
    }

    handleClose = (ingredientId) => {
        if(ingredientId != -1) {
            this.setState({
                open: false,
                selectedIngredientId: ingredientId
            });
            this.awaitGetIngredientNutrient(ingredientId, this.state.selectedType);
            this.awaitGetDailyIntake();
        } else {
            this.setState({
                open: false,
            })
        }
    }

    render() {
        return(
            <NutrientTemplate>
                <InputAndButton onSubmit={this.handleSubmit}/>
                {
                    (this.state.selectedIngredientId != -1) ?
                        <React.Fragment>
                            <GenderAge gender={this.state.selectedGender} age={this.state.selectedAge} onGenderClick={this.handleGenderClick} onAgeClick={this.handleAgeClick}/>
                            <NutrientType nutrientType={this.state.selectedType} onNutrientTypeClick={this.handleTypeClick}/>
                        </React.Fragment> : null
                }
                <NutrientTable nutRows={this.props.nutrients.toJS()} dailyRows={this.props.dailyIntake.toJS()}/>
                <NutrientSearchModal
                    id="search-ingredients"
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose}
                    valueProp={this.state.selectedIngredientId}
                    searchList={this.props.searchedIngredients.toJS()}
                />
            </NutrientTemplate>
        )
    }
}

export default connect(
    (state) => ({
        searchedIngredients: state.search.get('ingredients'),
        nutrients: state.nutrient.get('nutrients'),
        dailyIntake: state.dailyIntake.get('dailyIntake')
    }),
    (dispatch) => ({
        SearchActions: bindActionCreators(searchActions, dispatch),
        NutrientActions: bindActionCreators(nutrientActions, dispatch),
        DailyIntakeActions: bindActionCreators(dailyIntakeActions, dispatch)
    })
)(NutrientContainerWithHook);