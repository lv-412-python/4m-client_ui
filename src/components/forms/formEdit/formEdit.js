import React, {Component} from 'react';
import axios from 'axios';

import './formEdit.css';

class FormEdit extends Component {
    state = {
        // eslint-disable-next-line react/prop-types
        form_id: this.props.form_id,
        // eslint-disable-next-line react/prop-types
        owner: this.props.owner,
        title: undefined,
        description: undefined
    };

    componentDidMount() {
        axios.get(`http://127.0.0.1/form/${this.state.form_id}`).then(response => {
            const form = response.data;
            let object = {
                description: form.description,
                title: form.title
            };
            this.setState(object);
        });
    }

    passItem = (e) => {
        const id = e.currentTarget.dataset.div_id;
        // eslint-disable-next-line react/prop-types
        this.props.removeField(id);
    };

    handleChangeInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleSubmit = (e) => {
        // eslint-disable-next-line react/prop-types
        let value = this.props.selectedItems.map(value => value.id);
        const data = this.state;
        data.fields = value;
        e.preventDefault();
        axios.put(`http://127.0.0.1/form/${this.state.form_id}`, this.state).then(() => {
            window.location.reload();
        }).// eslint-disable-next-line no-console
        catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
    };

    render() {
        const {title, description} = this.state;
        return (
            <div className='align-self-end'>
                <form onSubmit={this.handleSubmit} className='edit_form'>
                    <label>
                        <p>Title:</p>
                        <input type='text' value={title} name='title' className='form_input'
                               onChange={this.handleChangeInput} autoComplete='off'/>
                    </label>
                    <label>
                        <p>Description:</p>
                        <textarea value={description} name='description' className='form_input'
                                  onChange={this.handleChangeInput} autoComplete='off'/>
                    </label>
                    <label>
                        <p>Fields:</p>
                    </label>
                    <label>

                    </label>
                </form>
                <div className='submit'>
                    <input className='btn btn-dark submit_btn' type='button' value="Submit"
                           onClick={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}

export default FormEdit;
