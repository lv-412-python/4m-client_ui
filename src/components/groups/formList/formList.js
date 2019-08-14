import React from 'react';
import "./formList.css";
const FormList = props => (

    <div>
        {
            // eslint-disable-next-line react/prop-types
            props.state.forms ? props.state.forms.map((form) => {
            return   (
            <div key={form.title}>
                <input type="checkbox" 
                id={form.form_id}
                className="form_list"
                value={form.form_id} 
                onClick={(
                    // eslint-disable-next-line react/prop-types
                        (e) => props.handleFormsChange(e, form)
                    )}></input>
                <label key={form.id} htmlFor={form.form_id}>{form.title}</label>
            </div>);
        }) : <div>You dont have any forms</div>
    }
    </div>
);

export {FormList};
