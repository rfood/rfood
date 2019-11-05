import React, { Component } from 'react';
import PageTitle from "components/Common/PageTitle";
import IngredientInsertContainer from "../containers/Ingredient/IngredientInsertContainer";

const IngredientInsertPage = () => {
    return(
        <React.Fragment>
            <PageTitle title="식재료 추가 API"/>
            <IngredientInsertContainer/>
        </React.Fragment>
    );
}

export default IngredientInsertPage;