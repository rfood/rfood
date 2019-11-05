import React from 'react';
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

const NutrientType = () => {
    const classes = useStyles();
    return(
        <React.Fragment>
            <Grid container spacing={10} alignItems="center">
                <Grid item>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button> 주요 영양소 </Button>
                        <Button> 비타민 </Button>
                        <Button> 무기질 </Button>
                        <Button> 아미노산 </Button>
                        <Button> 지방산 </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default NutrientType;