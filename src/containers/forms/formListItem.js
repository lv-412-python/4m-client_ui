import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';


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
            <div className='container'>
                <div className='row'>
                    <div className='col-6 form_list_item' key={this.state.id}>
                        <a className='form_title' onClick={this.toForm}>{this.state.title}</a>
                        <br/>
                        <p>{this.state.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(FormListItem);
