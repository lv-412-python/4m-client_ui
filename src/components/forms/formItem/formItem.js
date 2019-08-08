import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import {confirmAlert} from "react-confirm-alert";

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
        edit: undefined,
        selectedItems: []
    };

    setSelectedItems = (item) => {
        let exits = false;
        for (let el of this.state.selectedItems) {
            if (el.id === item.id) {
                exits = true;
                break;
            }
        }
        if (exits) {
            return;
        }
        this.setState({
            selectedItems: [...this.state.selectedItems, item],
        });

    };

    getData = () => {
        // eslint-disable-next-line react/prop-types
        axios.get(`http://127.0.0.1/form/${this.props.form_id}`).then(response => {
            this.setState({...response.data});
            axios.get(`http://127.0.0.1/field`, {
                params: {
                    'field_id': this.state.fields
                },
                paramsSerializer: params => {
                    return qs.stringify(params, {arrayFormat: 'repeat'});
                }
                // eslint-disable-next-line no-console
            }).then(response => this.setState({selectedItems: response.data}));
        })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.log(error.data);
            });
    };

    componentDidMount() {
        this.getData();
    }

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
                    <label>
                        {this.state.selectedItems.map(value => {
                            return (
                                <div key={value.id} className='field_in_form'>
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
                </div>
                <div className='btns'>
                    <button className='btn btn-dark edit_btn' onClick={this.props.edit} type="button">Edit</button>
                    <Link to='/form'>
                        <button className='btn btn-dark del_btn' onClick={this.delete} type="button">Delete</button>
                    </Link>
                </div>
            </div>

        );
    }
}

export default FormItem;
