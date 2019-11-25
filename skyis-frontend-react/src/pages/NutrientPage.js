import React, { Component } from 'react';
import PageTitle from "components/Common/PageTitle";
import NutrientContainer from "../containers/Nutrient/NutrientContainer";

const NutrientPage = () => {
    return(
        <React.Fragment>
            <PageTitle title="영양소 조회 API"/>
            <NutrientContainer/>
        </React.Fragment>
    );
}

export default NutrientPage;