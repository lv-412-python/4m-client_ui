import React from 'react';
import PropTypes from 'prop-types';

const TextInputField = props => (
    <div>
        <label>{props.title}
            <div>
                <input type="text" onChange={props.handleInputChange} name={props.field_id}/>
            </div>
        </label>
    </div>
);

TextInputField.propTypes = {
    handleInputChange: PropTypes.element.isRequired,
    name: PropTypes.element.isRequired,
    title: PropTypes.element.isRequired,
    field_id: PropTypes.element.isRequired
};

export default TextInputField;