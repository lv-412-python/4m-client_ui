import React, {Component} from 'react';

const TextInputField = props => (
    <div>
        <label>{props.title}:
            <input type="text" onChange={props.handleInputChange} name={props.name.replace(/ /g,"_")}/>
        </label>
    </div>
);

export default TextInputField;
