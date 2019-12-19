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
import NutrientTable from "../../components/Nutrient/NutrientTable";
import * as dailyIntakeActions from "../../store/modules/dailyIntake";

class NutrientContainer extends Component {
    state = {
        open: false,
        selectedIngredientId: -1,
        selectedGender: 0,
        selectedAge: 0,
        selectedType: 0,
        searchInput: '',
        dailyAmount: [[], []],
    }
    // 일일 섭취량은 초반에 모두 가져오고, 상황마다 사용하는쪽으로 구현했음
    componentDidMount() {
        console.log('hi');
        this.asyncGetDailyIntake();
    }

    asyncGetDailyIntake = async() => {
        await this.props.DailyIntakeActions.getDailyIntake();
        let array =  Array();
        this.props.dailyIntake.toJS().forEach(function(item) {
            array[item.id] = new Array();
            item.nutrients.forEach(function(nutrient) {
                array[item.id][nutrient.id] = nutrient.recommended_daily_amount.amount;
            })
        });
        this.setState({dailyAmount: array});
    }

    // 식재료 영양소 데이터 호출
    GetIngredientNutrient = ( ingredientId, nutrientType ) => {
        try {
            this.props.NutrientActions.getIngredientNutrient(ingredientId, nutrientType);
        } catch(e) {
            console.log(e);
        }
    }

    handleTypeClick = (event, type) => {
        this.GetIngredientNutrient(this.state.selectedIngredientId, type);
        this.setState({
            selectedType: type
        })
    }
    handleGenderClick = (event, gender) => {
        this.setState({
            selectedGender: gender
        });
    }

    handleAgeClick = (event, age) => {
        this.setState({
            selectedAge: age
        });
    };
    //
    SearchIngredient = (input) => {
        console.log(input);
        const { SearchActions } = this.props;
        try {
            SearchActions.searchIngredient(input);
            this.setState({
                open: true,
            })
        } catch(e) {
            console.log(e);
        }
    }
    handleSubmit = () => {
        this.SearchIngredient(this.state.searchInput);
    }
    handleChange = (e) => {
        this.setState({searchInput: e.target.value});
    }

    handleClose = (ingredientId, ingredientName) => {
        console.log(ingredientName);
        if(ingredientId != -1) {
            this.GetIngredientNutrient(ingredientId, this.state.selectedType);
            this.setState({
                open: false,
                searchInput: ingredientName,
                selectedIngredientId: ingredientId
            });
        } else {
            this.setState({
                open: false,
                searchInput: ingredientName,
            })
        }
    };

    render() {
        return(
            <NutrientTemplate>
                <InputAndButton value={this.state.searchInput} onSubmit={this.handleSubmit} onChange={this.handleChange} label="식재료 검색" buttonText="검색"/>
                {
                    (this.state.selectedIngredientId !== -1) ?
                        <React.Fragment>
                            <GenderAge gender={this.state.selectedGender} age={this.state.selectedAge} onGenderClick={this.handleGenderClick} onAgeClick={this.handleAgeClick}/>
                            <NutrientType nutrientType={this.state.selectedType} onNutrientTypeClick={this.handleTypeClick}/>
                        </React.Fragment> : null
                }
                {
                    this.props.nutrients.size < 1 ?
                        null
                        :
                        <NutrientTable genderAge={this.state.selectedGender * 5 + this.state.selectedAge} nutRows={this.props.nutrients.size < 1 || this.props.nutrients.length < 1 ? [] :this.props.nutrients.toJS()} dailyAmount={this.state.dailyAmount}/>
                }
                {
                    this.state.open === false ? null :
                        <NutrientSearchModal
                            id="search-ingredients"
                            keepMounted
                            open={this.state.open}
                            onClose={this.handleClose}
                            valueProp={this.state.selectedIngredientId}
                            searchList={this.props.searchedIngredients.toJS()}
                        />
                }
            </NutrientTemplate>
        )
    }
}

export default connect(
    (state) => ({
        searchedIngredients: state.searched.get('ingredients'),
        nutrients: state.nutrient.get('nutrients'),
        dailyIntake: state.dailyIntake.get('dailyIntake')
    }),
    (dispatch) => ({
        SearchActions: bindActionCreators(searchActions, dispatch),
        NutrientActions: bindActionCreators(nutrientActions, dispatch),
        DailyIntakeActions: bindActionCreators(dailyIntakeActions, dispatch)
    })
)(NutrientContainer);