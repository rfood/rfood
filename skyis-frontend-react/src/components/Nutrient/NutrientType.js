import React, {useState} from 'react';
import {
    makeStyles,
    Grid,
    Button,
    ButtonGroup
} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 500
    }
});

const NutrientType = ( {nutrientType, onNutrientTypeClick }) => {
    const classes = useStyles();
    const [nutrientTypeArray, setNutrientTypeArray] = useState([
        {name: '주요 영양소'},
        {name: '비타민'},
        {name: '무기질'},
        {name: '아미노산'},
        {name: '지방산'}
    ]);    return(
        <React.Fragment>
            <Grid container spacing={10} alignItems="center">
                <Grid item>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        {nutrientTypeArray.map((element, index) =>
                            <Button key={index} variant={index === nutrientType ? "contained" : ""} color="primary" onClick={(e) => onNutrientTypeClick(e, index)}>
                                {element.name}
                            </Button>
                        )}
                    </ButtonGroup>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default NutrientType;