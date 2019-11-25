import React from "react";
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

const NutrientSearchModal = ( {onClose, valueProp, open, searchList, ...other}) => {
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);

    React.useEffect(() => {
        if(!open) {
            setValue(valueProp);
        }
        if (typeof searchList === 'object' && searchList.constructor.name === 'Object' && Object.keys(searchList).length < 1 && Object.getOwnPropertyNames(searchList) < 1){
            searchList = [];
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if(radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    }
    const handleCancel = () => {
        onClose();
    }
    const handleOk = () => {
        onClose(value);
    }
    const handleChange = event => {
        setValue(event.target.value);
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
                    aria-label="ringtone"
                    name="ringtone"
                    value={value}
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
}

export default NutrientSearchModal;