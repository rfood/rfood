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

const SearchList = ({ rows } ) => {
    const classes = useStyles();
    // NULL CHECK
    if (typeof rows === 'object' && rows.constructor.name === 'Object' && Object.keys(rows).length < 1 && Object.getOwnPropertyNames(rows) < 1){
        rows = [];
    }
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
                {rows.map(row => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row"> {row.id}</TableCell>
                        <TableCell> {row.code} </TableCell>
                        <TableCell> {row.name} </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default SearchList;