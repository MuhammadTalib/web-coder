import React from 'react'
import TextField from '@material-ui/core/TextField';
import "./style.css";
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import IconButton from '@material-ui/core/IconButton';

const TextFieldComponent = (props) => {
    return ( 
        <TextField 
            id="outlined-search" 
            label={props.label}
            variant="outlined"
            value={props.value}
            style={{...props.style}} 
            type={props.type?props.type:"text"}
            onChange={(event)=>props.onChangeTextField(event.target.value)}
        /> );
}
 
export default TextFieldComponent;