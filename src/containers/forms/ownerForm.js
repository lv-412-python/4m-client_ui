import React from 'react';

const OwnerForm = props => (
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
