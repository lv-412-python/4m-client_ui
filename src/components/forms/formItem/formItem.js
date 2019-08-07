import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {confirmAlert} from "react-confirm-alert";

import FormEdit from '../formEdit/formEdit';

import 'react-confirm-alert/src/react-confirm-alert.css';
import './formItem.css';

class FormItem extends Component {
    state = {
        description: undefined,
        fields: '',
        // eslint-disable-next-line react/prop-types
        form_id: this.props.form_id,
        owner: undefined,
        title: undefined,
        edit: false,
        questions: undefined
    };

    getData = () => {
        // eslint-disable-next-line react/prop-types
        axios.get(`http://127.0.0.1/form/${this.props.form_id}`).then(response => {
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
        // this.getFields();
    }

    getFields = () => {
        // const form_id = this.state;
        // let list_id = form_id.split(',');
        const list_id = this.state.fields.map(parseInt);
        const fields_url = `http://127.0.0.1/field`;
        axios.get(fields_url, {params: {field_id: list_id}},
            {crossDomain: true}).then(response => {
            const questions = response.data;
            this.setState({questions});
        });
    };

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
                        }).catch(error => {
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
                    <Link to='/form'>
                        <button className='btn btn-dark del_btn' onClick={this.delete} type="button">Delete</button>
                    </Link>
                </div>
                {
                    this.state.edit && <FormEdit form_id={this.state.form_id} owner={this.state.owner}/>
                }
            </div>
        );
    }
}

export default FormItem;
