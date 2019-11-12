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
    }
}));
const GenderAge = () => {
    const classes = useStyles();
    const [genderArray, changeGenderArray] = useState([
        {name: '남성', active: true},
        {name: '여성', active: false}
    ]);

    const [ageArray, changeAgeArray] = useState([
        {name: '10대', active: true},
        {name: '20대', active: false},
        {name: '30~40대', active: false},
        {name: '50~64세', active: false},
        {name: '65세 이상', active: false}
    ]);


    useEffect(function onClick(index) {
        const genderItem = {
            ...genderArray[index],
            active: !genderArray[index].active
        }
        changeGenderArray(
            ...genderArray.slice(0, index),
            genderItem,
            ...genderArray.slice(index + 1, genderArray.length)
        )
    });

    return(
        <React.Fragment>
            <Grid container spacing={10} alignItems="center">
                <Grid item>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        {genderArray.map((element, index) =>
                            <Button key={index} onClick={() => useEffect(onClick(index))} variant={element.active ? "contained" : ""} color="primary">
                                {element.name}
                            </Button>
                        )}
                    </ButtonGroup>
                </Grid>
                <Grid item>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        {ageArray.map((element, index) =>
                            <Button key={index} onClick={() => this.onClick(index)} variant={element.active ? "contained" : ""} color="primary">
                                {element.name}
                            </Button>
                        )}
                    </ButtonGroup>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default GenderAge;