import React, {Component} from 'react';

const TextInputField = props => (
    <label>{props.title}:
            <input type="text" name={props.title}/>
    </label>
);

export default TextInputField;
