import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Grid,
    Button,
    ButtonGroup
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: props => ({
        marginRight: theme.spacing(2),
        backgroundColor: props.buttonBackgroundColor
    }),
    title: {
        flexGrow: 1
    },
    wrapper: {
    }
}));
const GenderAge = React.memo(({gender, age, onGenderClick, onAgeClick }) => {
    const classes = useStyles();
    const [genderArray, setGenderArray] = useState([
        {name: '남성'},
        {name: '여성'}
    ]);

    const [ageArray, setAgeArray] = useState([
        {name: '10대'},
        {name: '20대'},
        {name: '30~40대'},
        {name: '50~64세'},
        {name: '65세 이상'}
    ]);


    return(
        <React.Fragment>
            <Grid container spacing={10} alignItems="center" className={classes.wrapper}>
                <Grid item>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        {genderArray.map((element, index) =>
                            <Button key={index} variant={index === gender ? "contained" : ""} color="primary" onClick={(e) => onGenderClick(e, index)}>
                                {element.name}
                            </Button>
                        )}
                    </ButtonGroup>
                </Grid>
                <Grid item>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        {ageArray.map((element, index) =>
                            <Button key={index} variant={index === age ? "contained" : ""} color="primary" onClick={(e) => onAgeClick(e, index)}>
                                {element.name}
                            </Button>
                        )}
                    </ButtonGroup>
                </Grid>
            </Grid>
        </React.Fragment>
    );
});

export default GenderAge;