import React, { Component } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';

class FormItem extends Component {
    state = {
        title: this.props.title,
        description: this.props.description,
        id: this.props.id
    };
    render(){
        return (
            <div>
                <p>{ this.state.title }</p>
                <p>{ this.state.description }</p>
            </div>
        );
    }
}

// FormItem.propTypes = {
//     'title': PropTypes.object.isRequired
// };

export default FormItem;
