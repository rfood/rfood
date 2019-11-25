import React from 'react';
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

const SearchInput = ( { onChange, onInsert, value }) => {
    const classes = useStyles();
    return(
        <Paper className={classes.paper}>
            <TextField label="식재료 검색" onChange={onChange}>
                {value}
            </TextField>
            <Button variant="outlined" color="primary" align="center" onClick={onInsert} > 검색 </Button>
        </Paper>
    );
}

export default SearchInput;