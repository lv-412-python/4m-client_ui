import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { withRouter } from 'react-router-dom';
import FieldEdit from '../fieldEdit/fieldEdit';


class FieldItem extends Component
{
    state = {
        // eslint-disable-next-line react/prop-types
        'id': this.props.id,
        // eslint-disable-next-line react/prop-types
        'title': this.props.title,
        'has_choice': null,
        'is_multichoice': null,
        'has_autocomplete': null,
        'choices': [],
        'show_info': false,
        'edit': false
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const url = `http://127.0.0.1/field/${this.state.id}`;
        axios.get(url).then(response => {
            const field = response.data;
            let object = null;
            if (field.has_choice)
            {
                object = {
                    has_choice:field.has_choice,
                    is_multichoice: field.is_multichoice,
                    has_autocomplete: field.has_autocomplete,
                    choices: field.choices,
                    };
            }
            else {
                object = {
                    has_choice:field.has_choice,
                    is_multichoice: field.is_multichoice,
                    has_autocomplete: field.has_autocomplete,
                    };
            }
            this.setState(object);
        });
    };

    getMoreInfo = () => {
        this.setState({show_info: !this.state.show_info});
    };

    edit = () => {
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
                        axios.delete(url).
                        then(() => { window.location.reload() }).
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

    render() {
        return (
            <div>
                <p>{this.state.title}</p>
                <div>
                    <button className='btn btn-dark' onClick={this.getMoreInfo} type="button">Get more info</button>
                    <button className='btn btn-dark' onClick={this.edit} type="button">Edit</button>
                    <button className='btn btn-dark' onClick={this.delete} type="button">Delete</button>
                    {
                        this.state.show_info && (
                            <ul>
                                <li>Has autocomplete: { this.state.has_autocomplete? "True": "False" }</li>
                                <li>Has choices: { this.state.has_choice? "True": "False" }</li>
                                {
                                    this.state.has_choice ? this.state.choices.map((el, id) => <ul key={id}><li>{el.title}</li> </ul>): null
                                }
                                <li>Is multichoice: { this.state.is_multichoice? "True": "False" }</li>
                            </ul>
                        )
                    }
                    {
                        this.state.edit && <FieldEdit id={this.state.id} />
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(FieldItem);
