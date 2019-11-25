import React from 'react';
import {
    makeStyles,
    Paper
} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 500
    },
    paper: {

    }
});


const NutrientTemplate = ( { children } ) => {
    const classes = useStyles();
    return(
        <Paper className={classes.paper}>
            {children}
        </Paper>
    );
}

export default NutrientTemplate;