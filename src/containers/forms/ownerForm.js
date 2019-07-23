import React from 'react';

const OwnerForm = props => (
    // eslint-disable-next-line react/prop-types
    <form onSubmit={props.getForms}>
        <label>Owner id:
            <input type="number" min="1" name="owner" />
        </label>
        <div>
            <button>Get Forms</button>
        </div>
    </form>
);

export default OwnerForm;
