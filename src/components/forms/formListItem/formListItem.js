import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './formListItem.css';

class FormListItem extends Component {
    render() {
        // eslint-disable-next-line react/prop-types
        let getForm = this.props.getForm;
        return (
            <div className='all_forms'>
                {/* eslint-disable-next-line react/prop-types */}
                <div className='form_list_item' key={this.props.form_id}>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Link to={`/form/${this.props.form_id}`} onClick={getForm} value={this.props.form_id}
                          /* eslint-disable-next-line react/prop-types */
                          className='form_title'>{this.props.title}</Link>
                    {/* eslint-disable-next-line react/prop-types */}
                    <p className='form_description'>{this.props.description}</p>
                </div>
            </div>
        );
    }
}

export default FormListItem;
