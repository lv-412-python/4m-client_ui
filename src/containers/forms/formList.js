import React, { Component } from 'react';
import axios from 'axios';
import OwnerForm from './ownerForm';

class FormList extends Component {
    state = {
        forms: undefined,
        status: undefined
    };

    getForms = (e) => {
        e.preventDefault();
        const owner = e.target.elements.owner.value;
        const forms_url = `http://127.0.0.1:5050/form`;
        axios.get(forms_url, {params: {owner: owner}},
            {crossDomain: true}).then(response => {
            const forms = response.data;
            const status = response.status;
            this.setState({status});
            this.setState({forms});
        });
    };
    render() {
        return (
            <div>
                <OwnerForm getForms={this.getForms} />
                {(this.state.forms &&
                <table>
                    {this.state.forms.map((form) => {
                        return (
                            <div key={form.id}>
                                <p>{form.title}</p>
                                <p>{form.description}</p>
                            </div>
                        );
                    })}
                </table>)}
            </div>
        );
    }
}

export default FormList;
