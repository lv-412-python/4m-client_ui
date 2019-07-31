import React, {Component} from 'react';
import axios from 'axios';

import TextInputField from '../inputComponents/TextInputField';
import { element } from 'prop-types';


class answersForm extends Component {
    state = {
        form: {},
        form_title: "",
        fields: undefined,
        answers: undefined,
        answersResponse: {}
    };
    
    getForms = (e) => {
        e.preventDefault();
        const form_id = e.target.elements.form_id.value
        const forms_url = `http://127.0.0.1/form/${form_id}`;
        axios.get(forms_url,
            {crossDomain: true
            }).then(response => {
            const form = response.data;
            console.log(form);
            this.setState({form},()=>this.getFields());
        }).catch(error => {
            console.error(error);
        });
    }

    getFields = () => {
        const filter = this.state.form.fields.join("&field_id=")
        const fields_url = `http://127.0.0.1/field?field_id=${filter}`;
        axios.get(fields_url,
            {crossDomain: true
            }).then(response => {
            this.setState({fields: response.data});
        });
    }

    handleInputChange = (e) => {
        const {name , value} = e.target;
        let answersResponse = this.state.answersResponse

        answersResponse[name]=value;
        this.setState({answersResponse});
    };

    createAnswersResponseJSON = (e) => {
        e.preventDefault();
        // const responseJSON = this.state.fields.map(field =>{
        //     const field_id = field.id;
        //     const inputFieldName = field.title.replace(/ /g,"_");
        //     const reply = e.target.elements.inputFieldName.value;
        //     return({
        //         "form_id": this.state.form.form_id,
        //         "group_id": 10,
        //         "user_id": 10,
        //         "field_id": field_id,
        //         "reply": reply
        //     })
        // })
        console.log(this.state.answersResponse);
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
                <form onSubmit={this.createAnswersResponseJSON}>
                    { this.state.fields && (
                        <div>
                            <div><h2>{ this.state.form.title }</h2></div>
                            <div><p>{ this.state.form.description }</p></div>
                            { this.state.fields.map(field => {
                                return (
                                    <TextInputField key={field.id} 
                                                    handleInputChange={this.handleInputChange} 
                                                    title={field.title} 
                                                    name={field.title}/>
                                );
                            })}
                            <div>
                                <button className='btn btn-light'>Submit Answers</button>
                            </div>
                        </div>
                    )}
                </form>
                {/* <div>
                    <button className='btn btn-light' onClick={this.createAnswersResponseJSON}>Show Field answers</button>
                </div> */}
            </div>
        );
    }
}

export default answersForm;