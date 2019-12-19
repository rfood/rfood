import React, {createRef, useState, useRef } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    Button
} from "@material-ui/core";

const NutrientSearchModal = React.memo(( {onClose, valueProp, open, searchList, ...other}) => {
    const [value, setValue] = React.useState(valueProp);
    const [name, setName] = React.useState('');
    const radioGroupRef = useRef();

    React.useEffect(() => {
        if(!open) {
            setValue(valueProp);
        }
        if (typeof searchList === 'object' && searchList.constructor.name === 'Object' && Object.keys(searchList).length < 1 && Object.getOwnPropertyNames(searchList) < 1){
            searchList = [];
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        radioGroupRef.current.focus();
    }
    const handleCancel = () => {
        onClose(-1, '');
    }
    const handleOk = () => {
        onClose(value, name);
    }
    const handleChange = event => {
        console.log(event.target);
        setValue(event.target.value);
        setName(event.target.label);
        radioGroupRef.current.focus();
    }
    return(
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={handleEntering}
            open={open}
            {...other}>
            <DialogTitle id="dialog-title"> 선택해주세요 </DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    value={value}
                    label={name}
                    onChange={handleChange}>
                    {
                        typeof searchList === 'object' && searchList.constructor.name === 'Object' && Object.keys(searchList).length < 1 && Object.getOwnPropertyNames(searchList) < 1 ?
                            <div/> :
                        searchList.map(item => (
                        <FormControlLabel value={item.id} key={item.id} control={<Radio />} label={item.name}/>
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick = {handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default NutrientSearchModal;