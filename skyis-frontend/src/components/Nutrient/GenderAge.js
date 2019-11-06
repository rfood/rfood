import React from 'react';
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
    return(
        <React.Fragment>
            <Grid container spacing={10} alignItems="center">
                <Grid item>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button variant="contained" color="primary"> 남자 </Button>
                        <Button> 여자 </Button>
                    </ButtonGroup>
                </Grid>
                <Grid item>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button> 10대 </Button>
                        <Button> 20대 </Button>
                        <Button> 30~40대 </Button>
                        <Button> 50~64세 </Button>
                        <Button> 65세 이상 </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default GenderAge;