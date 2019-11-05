import React, { Component } from 'react';
import PageTitle from "components/Common/PageTitle";
import NutrientContainer from "../containers/Ingredient/NutrientContainer";

const NutrientPage = () => {
    return(
        <React.Fragment>
            <PageTitle title="영양소 조회 API"/>
            <NutrientContainer></NutrientContainer>
        </React.Fragment>
    );
}

export default NutrientPage;