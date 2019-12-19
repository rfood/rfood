import React, { useState, useCallback, } from 'react';
import {Button, makeStyles, Paper, TextField} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        }
    }
}));

export const InputAndButton = React.memo(({ onSubmit, onChange, value, label, buttonText }) => {
    const classes = useStyles();

    return(
        <Paper className={classes.paper}>
            <TextField value={value} label={label} onChange={onChange}/>
            <Button variant="outlined" color="primary" align="center" onClick={onSubmit}> {buttonText} </Button>
        </Paper>
    );
});