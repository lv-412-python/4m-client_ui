import React, {Component} from 'react';
import axios from 'axios';
import OwnerForm from '../ownerForm/ownerForm';
import FormListItem from "src/components/forms/formListItem/formListItem";
import ButtonNew from "src/components/forms/buttonNewForm/buttonNewForm";

import './formList.css';

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
        const forms_url = `http://127.0.0.1/form`;
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
            <div className='form-list'>
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
            <ButtonNew />
            </div>
        );
    }
}

export default FormList;
