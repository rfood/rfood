import React from 'react';
import {
    makeStyles,
    Paper, Table, TableBody, TableCell, TableHead, TableRow,
    TextField
} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 500
    }
});

const InsertList = ( {ingredient, status }) => {
    const classes = useStyles();
    // NULL CHECK
    return(
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell> Id </TableCell>
                    <TableCell> Code </TableCell>
                    <TableCell> Name </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    status == 'SUCCESS' ?
                        <TableRow key={ingredient.id}>
                            <TableCell component="th" scope="row"> {ingredient.id}</TableCell>
                            <TableCell> {ingredient.code} </TableCell>
                            <TableCell> {ingredient.name} </TableCell>
                        </TableRow>
                    :
                        <TableRow key={status}>
                            <TableCell component="th" scope="row"> Error </TableCell>
                            <TableCell> {status} </TableCell>
                            <TableCell>  </TableCell>
                        </TableRow>
                }
            </TableBody>
        </Table>
    );
}

export default InsertList;