import React, {Component} from 'react';
import axios from 'axios';

import TextInputField from '../inputComponents/TextInputField';

class answersForm extends Component {
    state = {
        form: {},
        form_title: "",
        fields: undefined,
        answers: undefined
    };
    
    getForms = (e) => {
        e.preventDefault();
        const form_id = e.target.elements.form_id.value
        const forms_url = `http://127.0.0.1/form/${form_id}`;
        axios.get(forms_url,
            {crossDomain: true}).then(response => {
            const form = response.data;
            this.setState({form},()=>this.getFields());
        }).catch(error => {
            console.error(error);
        });
    }

    getFields = () => {
        const filter = this.state.form.fields.join("&field_id=")
        const fields_url = `http://127.0.0.1/field?field_id=${filter}`;
        axios.get(fields_url,
            {crossDomain: true}).then(response => {
            this.setState({fields: response.data});
        });
    }

    creae 

    showState = (e) => {
        e.preventDefault();
        console.log(this.state.fields);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.getForms}>
                    <input type="number" min="1" name="form_id"></input>
                    <div>
                        <button className='btn btn-light'>Get Forms</button>
                    </div>
                </form>
                <form >
                    { this.state.fields && (
                        <div>
                            <div><h2>{ this.state.form.title }</h2></div>
                            <div><p>{ this.state.form.description }</p></div>
                            { this.state.fields.map(field => {
                                let field_title = field.title;
                                return (
                                    <div key={field.id}>
                                        <TextInputField title={field_title}/>
                                    </div>
                                );
                            })}
                            <div>
                                <button className='btn btn-light'>Submit Answers</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}

export default answersForm;