import React from 'react';
import {
    Table,
    makeStyles,
    TableRow,
    TableHead,
    TableCell, TableBody,
} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 500
    }
});

const NutrientTable = React.memo(({ genderAge, nutRows, dailyAmount } ) => {
    const classes = useStyles();
    console.log(nutRows);
    // NULL CHECK
    return(
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell> 영양소 </TableCell>
                    <TableCell> 일일권장량 </TableCell>
                    <TableCell> 함유량 </TableCell>
                    <TableCell> 비율 </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    nutRows.length < 1 ?
                        <div/> :
                        nutRows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row"> {row.name_kor}</TableCell>
                                <TableCell> {typeof dailyAmount == "undefined"  || dailyAmount[genderAge + 1][row.id] === undefined? '' : dailyAmount[genderAge + 1][row.id] + row.unit} </TableCell>
                                <TableCell>
                                    {row.ingredient_nutrient.nutrient_amount + row.unit}
                                </TableCell>
                                <TableCell> {dailyAmount[genderAge + 1][row.id] !== undefined ? (row.ingredient_nutrient.nutrient_amount / dailyAmount[genderAge + 1][row.id] * 100).toFixed(2) + '%' : ''} </TableCell>
                            </TableRow>
                        ))}
            </TableBody>
        </Table>
    );
});

export default NutrientTable;