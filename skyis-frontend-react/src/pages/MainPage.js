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
            <Link to="/page/nutrient/ingredient">
                <Button variant="contained" color="primary" className={classes.button}>
                    식재료 영양소 조회
                </Button>
            </Link>
            <Link to="/page/util/upload">
                <Button variant="contained" color="primary" className={classes.button}>
                    음식 데이터 업로드
                </Button>
            </Link>
            <Link to="/page/util/image">
                <Button variant="contained" color="primary" className={classes.button}>
                    음식 사진 검색
                </Button>
            </Link>
        </React.Fragment>
    );
}

export default MainPage;