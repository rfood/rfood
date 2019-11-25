import React, { Component }  from 'react';
import GenderAge from "../../components/Nutrient/GenderAge";
import NutrientType from "../../components/Nutrient/NutrientType";
import NutrientTable from "../../components/Nutrient/NutrientTable";
import NutrientChart from "../../components/Nutrient/NutrientChart";
import { connect } from 'react-redux';
import { bindActionCreators} from "redux";
import * as nutrientActions from '../../store/modules/nutrient';
import * as ingredientActions from '../../store/modules/ingredient';
import {Map} from "immutable";
import NutrientTemplate from "../../components/Nutrient/NutrientTemplate";
import SearchInput from "../../components/Ingredient/SearchInput";
import NutrientSearchModal from "./NutrientSearchModal";

class NutrientContainer extends Component {
    state =  {
        input: '',
        open: false,
        searched: false,
        selectedIngredient: 0,
    }
    handleGenderClick = (event, gender) => {
         this.props.NutrientActions.setGender(gender);
    }

    handleAgeClick = (event, age) => {
        this.props.NutrientActions.setAge(age);
    }

    handleTypeClick = (event, type) => {
        this.props.NutrientActions.setNutrientType(type);
    }
    handleInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    awaitSearchIngredient = async() => {
        const { IngredientActions } = this.props;
        try {
            await IngredientActions.searchIngredient(this.state.input);
            console.log(this.props.ingredient.toJS());
            this.setState({
                open: true,
                searched: true,
            })
        } catch(e) {
            console.log(e);
        }
    }

    handleSubmit = () => {
        console.log("handle submit");
        this.awaitSearchIngredient();
    }

    awaitGetIngredientNutrient = async(newID) => {
        try {
            await this.props.NutrientActions.getIngredientNutrient(newID, this.props.nutrientType);
            console.log(this.props.nutrients.toJS());
        } catch(e) {
            console.log(e);
        }
    }
    handleClose = newID => {
        this.awaitGetIngredientNutrient(newID);
        if(newID) {
            this.setState({
                open: false,
                selectedIngredient: newID
            })
        } else {
            this.setState({
                open: false
            })
        }
    }
    render() {
        return(
            <NutrientTemplate>
                <SearchInput value={this.state.input} onChange={this.handleInputChange} onInsert={this.handleSubmit}/>
                {
                    this.state.searched ?
                }
                <GenderAge gender={this.props.gender} age={this.props.age} onGenderClick={this.handleGenderClick} onAgeClick={this.handleAgeClick}/>
                <NutrientType nutrientType={this.props.nutrientType} onNutrientTypeClick={this.handleTypeClick}/>
                <NutrientChart/>
                <NutrientTable rows={this.props.nutrients.toJS()}/>
                <NutrientSearchModal
                    id="search-menu"
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose}
                    valueProp={this.state.selectedIngredient}
                    searchList={this.props.ingredient.toJS()}
                />
            </NutrientTemplate>
        )
    }
}

export default connect(
    (state) => ({
        gender: state.nutrient.get('gender'),
        age: state.nutrient.get('age'),
        nutrientType: state.nutrient.get('nutrientType'),
        nutrients: state.nutrient.get('nutrients'),
        recommend: state.nutrient.get('recommend'),
        food: state.nutrient.get('food'),
        ingredient: state.ingredient.get('ingredient')
    }),
    (dispatch) => ({
        NutrientActions: bindActionCreators(nutrientActions, dispatch),
        IngredientActions: bindActionCreators(ingredientActions, dispatch)
    })
) (NutrientContainer);
