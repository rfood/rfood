import React, { Component } from 'react';
import IngredientSearchContainer from "./IngredientSearchContainer";

class IngredientContainer extends Component {
    render() {
        return(
            <React.Fragment>
                <IngredientSearchContainer />
            </React.Fragment>
        );
    }
}

export default IngredientContainer;