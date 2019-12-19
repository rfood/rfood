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
    },
    textfield: {
        margin: theme.spacing(1)
    }
}));

const InsertInput = ( { onChange, onInsert, code, name }) => {
    const classes = useStyles();
    return(
        <Paper className={classes.paper}>
            <TextField name="code" label="추가할 식재료의 Code" onChange={onChange} className={classes.textfield}>
                {code}
            </TextField>
            <TextField name="name" label="추가할 식재료의 이름" onChange={onChange} className={classes.textfield}>
                {name}
            </TextField>
            <Button variant="outlined" color="primary" align="center" onClick={onInsert} > 추가 </Button>
        </Paper>
    );
}

export default InsertInput;