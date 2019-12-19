import React from 'react';
import {
    makeStyles,
} from "@material-ui/core";
import { AutoComplete } from '@material-ui/lab';

const useStyles = makeStyles({
    table: {
        minWidth: 500
    }
});


const NutrientSearch = () => {
    return(
        <AutoComplete>
            options={top100Films}
        </AutoComplete>
    );
}

export default NutrientSearch;