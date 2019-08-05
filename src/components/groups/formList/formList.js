import React from 'react';


const FormList = props => (
    <div>
        {
            // eslint-disable-next-line react/prop-types
            props.state.forms ? props.state.forms.map((form) => {
            return   (
            <div key={form.id}>
                <input type="checkbox" 
                id={form.form_id} 
                value={form.form_id} 
                onClick={(
                    // eslint-disable-next-line react/prop-types
                        (e) => props.handleFormsChange(e, form)
                    )}></input>
                <label htmlFor={form.form_id}>{form.title}</label>
            </div>);
        }) : <div>You dont have any forms</div>
    };
    </div>
);


export default FormList;