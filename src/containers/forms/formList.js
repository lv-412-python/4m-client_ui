import React, {Component} from 'react';
import axios from 'axios';
import OwnerForm from './ownerForm';
import FormListItem from "src/containers/forms/formListItem";
import ButtonNew from "src/containers/forms/buttonNewForm";

class FormList extends Component {
    state = {
        forms: undefined,
        status: undefined,
        title: undefined,
        description: undefined,
        id: undefined
    };

    getForms = (e) => {
        e.preventDefault();
        const owner = e.target.elements.owner.value;
        const forms_url = `http://127.0.0.1:80/form`;
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
            <div className='container'>
                <div className='row'>
                    <div className='col-12 new_form'>
                        <OwnerForm getForms={this.getForms}/>
                        {(this.state.forms &&
                            <div>
                                {this.state.forms.map(form => {
                                    return (<FormListItem key={form.form_id}
                                                          title={form.title}
                                                          id={form.form_id}
                                                          description={form.description}/>);
                                })
                                }
                            </div>)}
                    </div>
                </div>
                <ButtonNew/>
            </div>
        );
    }
}

export default FormList;
