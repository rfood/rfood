import React, { Component } from 'react';
import PageTitle from "components/Common/PageTitle";
import NutrientContainer from "../containers/Nutrient/NutrientContainer";

const IngredientNutrientPage = () => {
    return(
        <React.Fragment>
            <PageTitle title="식재료 영양소 조회 API"/>
            <NutrientContainer/>
        </React.Fragment>
    );
}

export default IngredientNutrientPage;