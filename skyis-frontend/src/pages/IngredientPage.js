import React, { Component } from 'react';
import PageTitle from "components/Common/PageTitle";
import IngredientContainer from "../containers/Ingredient/IngredientContainer";

const IngredientPage = () => {
    return(
        <React.Fragment>
            <PageTitle title="식재료 관련 API"/>
            <IngredientContainer/>
        </React.Fragment>
    );
}

export default IngredientPage;