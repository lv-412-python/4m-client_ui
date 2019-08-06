import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import './newForm.css';

class NewForm extends Component {
    state = {
        title: undefined,
        description: undefined,
        owner: ''
    };

    handleChangeInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    getOwner = () => {
        const auth_status_url = 'http://127.0.0.1/users/profile';

        axios.get(auth_status_url, {withCredentials: true}).then(response => {
            this.setState({
                owner: response.data.user_id
            });
        }).// eslint-disable-next-line no-console
        catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
    };

    componentDidMount() {
        this.getOwner();
    }

    handleSubmit = () => {
        // eslint-disable-next-line react/prop-types
        let value = this.props.selectedItems.map(value => value.id);
        const data = this.state;
        data.fields = value;
        axios.post('http://127.0.0.1/form', data).then(function (response) {
            // eslint-disable-next-line no-console
            console.info(response);
        }).catch(function (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        });
    };

    passItem = (e) => {
        const id = e.currentTarget.dataset.div_id;
        // eslint-disable-next-line react/prop-types
        this.props.removeField(id);
    };

    render() {
        const {title, description} = this.state;
        return (
            <div>
                <form className='new_form col align-self-end'>
                    <label>
                        <p>Title:</p>
                        <input type='text' required value={title} name='title' className='form_input'
                               onChange={this.handleChangeInput} autoComplete="off"/>
                    </label>
                    <label>
                        <p>Description:</p>
                        <textarea value={description} name='description' className='form_input'
                                  onChange={this.handleChangeInput} autoComplete="off"/>
                    </label>
                    <label>
                        <p>Fields:</p>
                        {/* eslint-disable-next-line react/prop-types */}
                        {this.props.selectedItems.map(value => {
                            return (
                                <div key={value.id} data-div_id={value.id} className='field_in_form'
                                     onDoubleClick={this.passItem}>
                                    <p className='field_in_form_title'>{value.title}</p>
                                    <div>
                                        {
                                            // eslint-disable-next-line react/prop-types
                                            (value.has_choice ?
                                                    <ul className='field_options'>
                                                        {
                                                            // eslint-disable-next-line react/prop-types
                                                            value.choices.map((el, id) =>
                                                                <ul key={id}>
                                                                    <li>{el.title}</li>
                                                                </ul>)
                                                        }
                                                    </ul> : null
                                            )
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </label>
                </form>
                <Link className='submit' to="/form">
                    <input className='btn btn-dark submit_btn' type='button' value="Submit"
                           onClick={this.handleSubmit}/>
                </Link>
            </div>
        );
    }
}

export default NewForm;
