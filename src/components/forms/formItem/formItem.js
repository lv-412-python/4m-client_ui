import React, {Component} from 'react';
import axios from 'axios';
import {confirmAlert} from "react-confirm-alert";

import FormEdit from '../formEdit/formEdit';

import 'react-confirm-alert/src/react-confirm-alert.css';
import './formItem.css';

class FormItem extends Component {
    state = {
        description: undefined,
        fields: undefined,
        // eslint-disable-next-line react/prop-types
        form_id: this.props.form_id,
        owner: undefined,
        title: undefined,
        edit: false
    };

    getData = () => {
        // eslint-disable-next-line react/prop-types
        axios.get(`http://127.0.0.1/form/${this.props.match.params.id}`).then(response => {
            // eslint-disable-next-line no-console
            console.log(response.data);
            this.setState({...response.data});
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.log(error.data);
        });
    };

    componentDidMount() {
        this.getData();
    }

    edit = () => {
        this.setState({edit: !this.state.edit});
    };

    delete = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this form?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const url = `http://127.0.0.1/form/${this.state.form_id}`;
                        axios.delete(url).then(() => {
                            window.location.reload();
                        }).
                        catch(error => {
                            // eslint-disable-next-line no-console
                            console.log(error);
                        });
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    render() {
        return (
            <div>
                <div className='form_item text_form'>
                    <p className='title_form'>{this.state.title}</p>
                    <p>{this.state.description}</p>
                    <p>{this.state.fields}</p>
                </div>
                <div className='btns'>
                    <button className='btn btn-dark edit_btn' onClick={this.edit} type="button">Edit</button>
                    <button className='btn btn-dark del_btn' onClick={this.delete} type="button">Delete</button>
                </div>
                {
                    this.state.edit && <FormEdit id={this.state.id} />
                }
            </div>
        );
    }
}

export default FormItem;
