import React, { Component } from 'react';
import PageTitle from "components/Common/PageTitle";
import IngredientSearchContainer from "../containers/Ingredient/IngredientSearchContainer";

const IngredientSearchPage = () => {
    return(
        <React.Fragment>
            <PageTitle title="식재료 조회 API"/>
            <IngredientSearchContainer/>
        </React.Fragment>
    );
}

export default IngredientSearchPage;