import React, { Component } from 'react';
import InsertInput from "../../components/Ingredient/InsertInput";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as ingredientActions from "../../store/modules/ingredient";
import InsertList from "../../components/Ingredient/InsertList";

class IngredientInsertContainer extends Component {
    state = {
        code: '',
        name: ''
    }

    initialize = async() => {
        const { IngredientActions } = this.props;
        try {
            await IngredientActions.insertIngredient(this.state.code, this.state.name);
        } catch(e) {
            console.log(e);
        }
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleInsert = () => {
        this.initialize();
    }
    render() {
        const { code, name } = this.state;
        const { handleChange, handleInsert } = this;
        const { ingredient, status } = this.props;
        return(
            <React.Fragment>
                <InsertInput onChange={handleChange} onInsert={handleInsert} code={code} name={name}> </InsertInput>
                {
                    status == 'READY' ? null :
                    <InsertList ingredient={ingredient.toJS()} status={status}/>
                }
            </React.Fragment>
        );
    }
}

export default connect(
    (state) => ({
        ingredient: state.ingredient.get('ingredient'),
        status: state.ingredient.get('status'),
    }),
    (dispatch) => ({
        IngredientActions: bindActionCreators(ingredientActions, dispatch)
    })
)(IngredientInsertContainer);