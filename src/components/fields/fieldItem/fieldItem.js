import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { withRouter } from 'react-router-dom';
import FieldEdit from '../fieldEdit/fieldEdit';
import 'react-confirm-alert/src/react-confirm-alert.css';

import './fieldItem.css';


class FieldItem extends Component
{
    state = {
        id: this.props.id,
        title: this.props.title,
        has_choice: null,
        is_multichoice: null,
        choices: [],
        show_info: false,
        edit: false,
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const url = `http://127.0.0.1/field/${this.state.id}`;
        axios.get(url, {withCredentials: true}).then(response => {
            const field = response.data;
            let object = null;
            if (field.has_choice)
            {
                object = {
                    has_choice:field.has_choice,
                    is_multichoice: field.is_multichoice,
                    choices: field.choices,
                    };
            }
            else {
                object = {
                    has_choice:field.has_choice,
                    is_multichoice: field.is_multichoice,
                    };
            }
            this.setState(object);
        });
    };

    getMoreInfo = () => {
        this.state.edit ? this.setState({
            edit: false,
            show_info: !this.state.show_info}):
            this.setState({show_info: !this.state.show_info});
    };

    edit = () => {
        this.state.show_info? this.setState({
            show_info: false,
            edit: !this.state.edit}):
            this.setState({edit: !this.state.edit});
    };

    delete = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this field?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const url = `http://127.0.0.1/field/${this.state.id}`;
                        axios.delete(url, {withCredentials: true}).
                        then(() => { this.props.refresh() }).
                        // eslint-disable-next-line no-console
                        catch(error => { console.log(error) });
                    }
                },
                {
                    label: 'No'
                }
                ]
        });
    };

    passItem = () => {
        const {
            id, title, has_choice, is_multichoice, choices
        } = this.state;
        this.props.setSelectedItems(
            {
                id:id,
                title:title,
                has_choice:has_choice,
                is_multichoice:is_multichoice,
                choices:choices
            });
    };

    render() {
        return (
            <div className='field_list_element background_color'>
                <div className='field_title'
                     title="Double click to add it to the form."
                     onDoubleClick={this.passItem}>{this.state.title}</div>
                {
                    this.state.show_info &&
                    ( this.state.has_choice ?
                            <ul className='padding-10px'>
                                <li>type: dropdown</li>
                                <li>Options: </li>
                                {
                                    this.state.choices.map((el, id) => <ul key={id}><li>{el.title}</li> </ul>)
                                }
                                <li>Is multichoice: { this.state.is_multichoice? "True": "False" }</li>
                            </ul>:
                            <ul className='padding-10px'>
                                <li>type: text</li>
                            </ul>
                    )
                }
                {
                    this.state.edit && <FieldEdit refresh={this.props.refresh} hideEdit={this.edit} id={this.state.id} />
                }
                <div className='my_buttons'>
                    <button className='btn btn-dark field_btn' onClick={this.getMoreInfo} type="button">Get more info</button>
                    <button className='btn btn-dark field_btn' onClick={this.edit} type="button">Edit</button>
                    <button className='btn btn-dark field_btn' onClick={this.delete} type="button">Delete</button>
                </div>
            </div>
        );
    }
}

export default withRouter(FieldItem);
