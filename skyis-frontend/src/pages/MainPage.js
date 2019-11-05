import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    makeStyles,
    Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const MainPage = () => {
    const classes = useStyles();
    return(
        <React.Fragment>
            <Link to="/page/ingredient/search">
                <Button variant="contained" color="primary" className={classes.button}>
                    식재료 조회
                </Button>
            </Link>
            <Link to="/page/ingredient/insert">
                <Button variant="contained" color="primary" className={classes.button}>
                    식재료 추가
                </Button>
            </Link>
            <Link to="/page/nutrient/food">
                <Button variant="contained" color="primary" className={classes.button}>
                    음식 영양소 조회
                </Button>
            </Link>
        </React.Fragment>
    );
}

export default MainPage;