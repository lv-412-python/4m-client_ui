import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';

import UserAnswers from '../userAnswers/userAnswers';
import TextInputField from '../inputComponents/TextInputField';


class AnswersForm extends Component {
    state = {
        user_id: this.props.location.state.userId,
        form_id: this.props.location.state.form_id,
        isAnswered: false,
        form: {},
        fields: [],
        answers: {},
        options: {},
        result: [],
        selectedOption: null
    };

    checkFormStatus = () => {
        const answersURL = 'http://127.0.0.1/answers';
        axios.get(answersURL, {
            crossDomain: true,
            withCredentials:true,
            params: {
                user_id: this.state.user_id,
                form_id: this.state.form_id
            }
            }).then(response => {
                const formStatus = response.status === 200 ? true : false;
                if(formStatus){
                    this.setState({isAnswered: true});
                }
                }
            );
    }

    getForms = () => {
        const formId = this.state.form_id;
        const formsURL = `http://127.0.0.1/form/${formId}`;
        axios.get(formsURL, {
            crossDomain: true,
            withCredentials:true
            }).then(response => {
            const form = response.data;
            this.setState({form},()=>this.getFields());
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.error(error);
        });
    };

    getFields = () => {
        this.state.form.fields.map( field => {
            const fields_url = `http://127.0.0.1/field/${field}`;
            axios.get(fields_url,{
                crossDomain: true,
                withCredentials: true
                }).then(response => {
                this.setState({fields: [...this.state.fields, response.data]}, ()=>this.createOptions());
            });
        });
    }

    createOptions = () => {
        let options = this.state.options;
        this.state.fields.map( field => {
            if (field.has_choice === true){
                let choices = [];
                field.choices.map( choice => {
                    choices.push({value: choice.title , label: choice.title, fieldId: field.id });
                });
                options[field.id] = choices;
                this.setState({options: options});
            }
        });
    }
    
    postAnswers = () => {
        const data = this.state.result;
        axios.post('http://127.0.0.1/answers', data,{
            crossDomain: true,
            withCredentials: true
            }).then(function (response) {
            // eslint-disable-next-line no-console
            console.info(response);
            }).catch(function (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            });
    };

    handleInputChange = (e) => {
        const {name , value} = e.target;
        let answers = this.state.answers;
        answers[name] = 
        { 
            "form_id": this.state.form.form_id,
            "user_id": this.state.user_id,
            "field_id": name,
            "reply": value
        };
        this.setState({answers});
    };

    createAnswersResponseJSON = (e) => {
        e.preventDefault();
        let result = [];
        Object.keys(this.state.answers).map( key => {
            result.push(this.state.answers[key]);
        });
        this.setState({result}, ()=>this.postAnswers());
    };

    handleSelectChange = (selectedOption) => {
        const {fieldId , value} = selectedOption;
        let answers = this.state.answers;
        answers[fieldId] = 
        { 
            "form_id": this.state.form.form_id,
            "user_id": this.state.user_id,
            "field_id": fieldId,
            "reply": value
        };
        this.setState({answers});
    };

    componentDidMount(){
        this.getForms();
        this.checkFormStatus();
    }

    render(){
        return(
            <div>
                { (this.state.isAnswered && <div><UserAnswers userId={this.state.user_id}
                                                         formId={this.state.form_id}/>
                                            </div>) 
                ||
                (<form onSubmit={this.createAnswersResponseJSON}>
                    { this.state.fields && (
                        <div>
                            <h2>{ this.state.form.title }</h2>
                            <p>{ this.state.form.description }</p>
                            { this.state.fields.map(field => {
                                if (field.has_choice === true) {
                                    return(
                                        <div key = {field.id}>
                                            <label>
                                                {field.title}
                                                <Select options={this.state.options[field.id]}
                                                        onChange={this.handleSelectChange}
                                                        name={field.id}/>
                                            </label>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <TextInputField key={field.id} 
                                                        handleInputChange={this.handleInputChange} 
                                                        title={field.title} 
                                                        field_id={field.id}/>
                                    );
                                }
                            })}
                            <div>
                                <button className='btn btn-outline-dark'>Submit Answers</button>
                            </div>
                        </div>
                    )}
                </form>) 
                }
            </div>
        );
    }
}

export default AnswersForm;