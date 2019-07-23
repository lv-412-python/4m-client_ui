import React, { Component } from 'react';
import axios from 'axios';

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
        this.setState({owner: parseInt(value,10)});
    };
    handleChangeFields = e => {

        let value = e.target.value.split(',').map(function(item) {
            return parseInt(item, 10);
        });
        this.setState({fields: value});
    };
    handleSubmit = () => {
        // console.log(this.state)
        const data = this.state;
        axios.post('http://127.0.0.1:5050/form', data).
        // eslint-disable-next-line no-console
            then(function (response) { console.info(response) }).
        // eslint-disable-next-line no-console
            catch(function (error) { console.error(error) });
        alert('Posted some data: ' + this.state.title);
    };

    render() {
        const { title, description, owner, fields} = this.state;
        return (
            <form >
                <label>
                    Title:
                    <input type='text' value={title} name='title'
                           onChange={this.handleChangeInput} />
                </label>
                <label>
                    Description:
                    <textarea value={description} name='description'
                              onChange={this.handleChangeInput} />
                </label>
                <label>
                    Owner:
                     <input type='text' value={owner} name='owner'
                           onChange={this.handleChangeOwner} />
                </label>
                <label>
                    Fields:
                    <input type='text' value={fields} name='fields'
                           onChange={this.handleChangeFields} />
                </label>
                <input type='button' value="Submit" onClick={this.handleSubmit}/>
            </form>
        );
    }
}

export default NewForm;