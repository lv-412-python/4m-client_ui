import React from 'react';

import './ownerForm.css';

const OwnerForm = props => (
    <div className='container'>
        <div className='row'>
            {/* eslint-disable-next-line react/prop-types */}
            <form onSubmit={props.getForms} className='owner_form col-6'>
                <label>Owner id:
                    <input className='owner_input' type="number" min="1" name="owner"/>
                </label>
                <div>
                    <button className='btn btn-dark'>Get Forms</button>
                </div>
            </form>
        </div>
    </div>
);

export default OwnerForm;
