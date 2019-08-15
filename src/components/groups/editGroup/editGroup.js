import React, {Component} from 'react';
import Select from 'react-select';
import axios from 'axios';
import {URL} from 'src/constants';
import "./editGroup.css";

class EditGroup extends Component {

    state = {
        title: this.props.title,
        selectedOption: null,
        getUsers: undefined,
        someList: undefined
    };

    createList = () => {
        let someList = [];
        this.state.getUsers.map(i => {
            someList.push({value: i.user_id, label: i.email});
        });
        this.setState({someList: someList});
    };

    getUsers = () => {
        const GET_USERS_URL = `http://${URL}/users`;
        axios.get(GET_USERS_URL, {withCredentials: true}
        ).then(response => {
            this.setState({getUsers: response.data}, () => {
                this.createList();
            });
        });
    };

    handleTitleChange = (event) => {
        const value = event.target.value;
        this.setState({
            title: value,
        });
    };

    editGroup = (e) => {
        e.preventDefault();
        let members = [];
        this.state.selectedOption.map(userId => {
            members.push(userId.value);
        });
        let body = {
            title: this.state.title,
            owner_id: this.props.owner,
            members: members,
            assigned_to_forms: this.props.forms
        };
        const GROUP_PUT_URL = `http://${URL}/group/${this.props.id}`;
        axios.put(GROUP_PUT_URL, body, {withCredentials: true, crossDomain: true}
        ).then((response) => {
            // eslint-disable-next-line no-console
            console.log(response);
        }).catch((response) => {
            // eslint-disable-next-line no-console
            console.log(response);
        });
    };

    componentDidMount() {
        this.getUsers();
    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
    };

    render() {
        return (
            <div className='edit_main_component'>
                <div className='edit_group_container'>
                <form onSubmit={this.editGroup}>
                    <label className='title_edit'>
                        Title:
                        <div>
                            <input value={this.state.title} className='group_input' onChange={this.handleTitleChange}/>
                        </div>
                    </label>
                    <label className='title_edit'>
                        Members:
                        <Select
                            className='select_wight'
                            defaultValue={[...this.props.userEmail]}
                            options={this.state.someList}
                            onChange={this.handleChange}
                            isMulti
                        />
                    </label>
                    <input type="submit" className='btn btn_save' value="Save"/>
                </form>
                </div>
            </div>
        );
    }
}

export {EditGroup};
