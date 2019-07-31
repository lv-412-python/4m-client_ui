import React, {Component} from 'react';
import axios from 'axios';

import './newForm.css';

class NewForm extends Component {
    state = {
        title: '',
        description: '',
        owner: '',
        fields: []
    };

    handleChangeInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleChangeOwner = e => {
        const {value} = e.target;
        this.setState({owner: parseInt(value, 10)});
    };

    handleChangeFields = e => {
        let val = e.target.value;
        let value = val.split(',').map(function (item) {
            return item;
        });
        this.setState({fields: value});
    };

    handleSubmit = () => {
        const data = this.state;
        axios.post('http://127.0.0.1:5050/form', data).then(function (response) {
            // eslint-disable-next-line no-console
            console.info(response);
        }).catch(function (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        });
        alert('Posted new form: ' + this.state.title);
    };

    render() {
        const {title, description, owner, fields} = this.state;
        return (
            <div>
                <form className='new_form col align-self-end'>
                    <label>
                        <p>Title:</p>
                        <input type='text' value={title} name='title' className='form_input'
                               onChange={this.handleChangeInput}/>
                    </label>
                    <br/>
                    <label>
                        <p>Description:</p>
                        <textarea value={description} name='description' className='form_input'
                                  onChange={this.handleChangeInput}/>
                    </label>
                    <br/>
                    <label>
                        <p>Owner:</p>
                        <input type='text' value={owner} name='owner' className='form_input'
                               onChange={this.handleChangeOwner}/>
                    </label>
                    <br/>
                    <label>
                        <p>Fields:</p>
                        <input type='text' value={fields} name='fields' className='form_input'
                               onChange={this.handleChangeFields}/>
                    </label>
                </form>
                <br/>
                <div className='submit'>
                    <input className='btn btn-dark submit_btn' type='button' value="Submit"
                           onClick={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}

export default NewForm;
