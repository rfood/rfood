import React, { Component }  from 'react';
import GenderAge from "../../components/Nutrient/GenderAge";
import NutrientType from "../../components/Nutrient/NutrientType";
import NutrientTable from "../../components/Nutrient/NutrientTable";
import { PieChart } from "@toast-ui/react-chart/src";

class NutrientContainer extends Component {
    render() {
        const data = {
            categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
            series: [
                {
                    name: 'Budget',
                    data: [5000, 3000, 5000, 7000, 6000, 4000]
                },
                {
                    name: 'Income',
                    data: [8000, 1000, 7000, 2000, 5000, 3000]
                }
            ]
        };

        const options = {
            chart: {
                width: 1160,
                height: 650,
                title: 'Monthly Revenue',
                format: '1,000'
            },
            yAxis: {
                title: 'Month'
            },
            xAxis: {
                title: 'Amount',
                min: 0,
                max: 9000,
                suffix: '$'
            },
            series: {
                showLabel: true
            }
        };
        return(
            <React.Fragment>
                <GenderAge/>
                <NutrientType/>
                <PieChart
                    data={data}
                    options={options}/>
                <NutrientTable/>
            </React.Fragment>
        )
    }
}

export default NutrientContainer;
