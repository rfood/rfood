import React from 'react';
import {
    makeStyles,
} from "@material-ui/core";
import { Chart} from "react-google-charts";

const useStyles = makeStyles({
    table: {
        minWidth: 500
    }
});

const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7] // CSS-style declaration
];
const options = {
    title: "Nutrient",
    pieHole: 0.4,
    is3D: false
};

const NutrientChart = () => {
    return(
        <Chart
            chartType="PieChart"
            width="66%"
            height="400px"
            data={data}
            options={options}
        />
    );
}

export default NutrientChart;