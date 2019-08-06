import React, {Component} from 'react';
import axios from 'axios';

import './newForm.css';

class NewForm extends Component {
    state = {
        title: '',
        description: '',
        owner: ''
    };

    handleChangeInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    getOwner = () => {
        const auth_status_url = 'http://127.0.0.1/users/status';

        axios.get(auth_status_url, {withCredentials: true}).
        then(response => {this.setState({
            owner: response.data.user_id
        });
        }).
        // eslint-disable-next-line no-console
        catch(error => { console.log(error) });
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
        alert('Posted new form: ' + this.state.title);
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
                        <input type='text' value={title} name='title' className='form_input'
                               onChange={this.handleChangeInput}/>
                    </label>
                    <label>
                        <p>Description:</p>
                        <textarea value={description} name='description' className='form_input'
                                  onChange={this.handleChangeInput}/>
                    </label>
                    {/*<label>*/}
                    {/*    <p>Owner:</p>*/}
                    {/*    <input type='text' value={owner} name='owner' className='form_input'*/}
                    {/*           onChange={this.handleChangeOwner}/>*/}
                    {/*</label>*/}
                    <label>
                        <p>Fields:</p>
                        {/* eslint-disable-next-line react/prop-types */}
                        {this.props.selectedItems.map(value => {
                            return (
                                <div key={value.id} data-div_id={value.id} className='field_in_form' onDoubleClick={this.passItem} >
                                    <p className='field_in_form_title'>{value.title}</p>
                                    <div>
                                    {
                                        // eslint-disable-next-line react/prop-types
                                        ( value.has_choice ?
                                                <ul className='field_options'>
                                                    {
                                                        // eslint-disable-next-line react/prop-types
                                                        value.choices.map((el, id) =>
                                                            <ul key={id}><li>{el.title}</li></ul>)
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
                <div className='submit'>
                    <input className='btn btn-dark submit_btn' type='button' value="Submit"
                           onClick={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}

export default NewForm;
