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

const NutrientTable = ({ rows } ) => {
    const classes = useStyles();
    // NULL CHECK
    if (typeof rows === 'object' && rows.constructor.name === 'Object' && Object.keys(rows).length < 1 && Object.getOwnPropertyNames(rows) < 1){
        rows = [];
    }
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
                <TableRow>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                    <TableCell component="th" scope="row"> TEST1 </TableCell>
                </TableRow>


            </TableBody>
        </Table>
    );
}

export default NutrientTable;