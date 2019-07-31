import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import './formListItem.css';

class FormListItem extends Component {


    state = {
        // eslint-disable-next-line react/prop-types
        title: this.props.title,
        // eslint-disable-next-line react/prop-types
        description: this.props.description,
        // eslint-disable-next-line react/prop-types
        id: this.props.id
    };

    toForm = () => {
        // eslint-disable-next-line react/prop-types
        this.props.history.push(`/form/${this.state.id}`);
    };


    render() {
        return (
            <div className='all_forms'>
                <div className='form_list_item' key={this.state.id}>
                    <a className='form_title' onClick={this.toForm} href='#'>{this.state.title}</a>
                    <p className='form_description'>{this.state.description}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(FormListItem);