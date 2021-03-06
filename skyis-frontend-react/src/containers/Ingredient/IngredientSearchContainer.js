import React, { Component } from 'react';
import SearchInput from "../../components/Common/SearchInput";
import * as ingredientActions from '../../store/modules/ingredient';
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import SearchList from "../../components/Ingredient/SearchList";

class IngredientSearchContainer extends Component {
    state = {
        input: '',
    }

    initialize = async() => {
        const { IngredientActions } = this.props;
        try {
            await IngredientActions.searchIngredient(this.state.input);
        } catch(e) {
            console.log(e);
        }
    }
    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            input: value
        });
    }

    handleInsert = () => {
        this.initialize();
    }

    render() {
        const { input } = this.state;
        const { ingredient } = this.props;
        const {
            handleChange,
            handleInsert
        } = this;
        return(
            <React.Fragment>
                <SearchInput onChange={handleChange} onClick={handleInsert} value={input} label='식재료 검색'/>
                <SearchList rows={ingredient.toJS()}/>
            </React.Fragment>
        );
    }
}

export default connect(
    (state) => ({
        ingredient: state.ingredient.get('ingredient')
    }),
    (dispatch) => ({
        IngredientActions: bindActionCreators(ingredientActions, dispatch)
    })
)(IngredientSearchContainer);