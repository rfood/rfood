import React, { Component } from 'react';
import { makeStyles } from "@material-ui/core";

import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    typography: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2)
    },
}));

const PageTitle = ( {title} ) => {
    const classes = useStyles();
    return(
        <Typography component="h1" variant="h4" align="center" className={classes.typography}>
            {title}
        </Typography>
    )
}

export default PageTitle;