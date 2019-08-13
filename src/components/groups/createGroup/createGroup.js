import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {FormList} from 'src/components/groups';
import { URL } from 'src/constants';
import {Link} from 'react-router-dom';
import "./createGroup.css"

class CreateGroup extends Component {
    
    state = {
        forms: undefined,
        title: undefined,
        members: [],
        checked_forms: new Set(),
        owner_id: undefined,
        usersList: undefined,
        getUsers: undefined,
        selectedOption: null,
    };

    getForms = () => {
        const OWNER_FORMS = `http://${URL}/form?owner=${this.state.owner_id}`;
        axios.get(OWNER_FORMS, {crossDomain: true, withCredentials:true}).then(response => {
            const forms = response.data;
            this.setState({forms});
        });
        
    };


    getOwner = () => {
        const AUTH_STATUS_URL = `http://${URL}/users/profile`;

        axios.get(AUTH_STATUS_URL, {withCredentials: true}).
            then(response => {this.setState({
                owner_id: response.data.user_id
                }, () => {this.getForms()}); 
            }).
            // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    };

    componentDidMount() {
        this.getOwner();
        this.getUsers();
    }

    handleSubmit = (event) =>  {
        const GROUP_POST_URL = `http://${URL}/group`;
        event.preventDefault();
        let members = [];
        let forms = [...this.state.checked_forms];
        this.state.selectedOption.map(userId=>{
            members.push(userId.value);
        });
        let data = {
            title:this.state.title,
            owner_id:this.state.owner_id,
            members: members,
            assigned_to_forms:forms
        };
        axios.post(GROUP_POST_URL, data, {crossDomain: true, withCredentials:true}).
            then(response => { 
             // eslint-disable-next-line no-console
                console.log(response);
            }).
            catch(error => { 
                // eslint-disable-next-line no-console
                console.log(error);
            });
    };

    handleFormsChange = (event, form) => {
        const checked = event.target.checked;
        if(checked){
            let checked_forms = [...this.state.checked_forms];
            checked_forms.push(form.form_id);
            checked_forms = new Set(checked_forms);
            this.setState({checked_forms});
        }
        else{
            let checked_forms = this.state.checked_forms;
            checked_forms.delete(form.form_id);
            this.setState({checked_forms});
        }
    }

    handleTitleChange = (event) => {
        const value = event.target.value;
        this.setState({
            title: value,
        });
    };


    createList = ()=>{
        let usersList=[];
        this.state.getUsers.map(i =>{
            usersList.push({value: i.user_id, label: i.email});
        });
        this.setState({usersList});
    }

    getUsers =()=> {
        const GET_USERS_URL = `http://${URL}/users`;
        axios.get(GET_USERS_URL, {withCredentials: true}
        ).then(response=>{
            this.setState({getUsers:response.data},()=>{this.createList()});
        });
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    render() {
        return (
            <div>
                <form className="new_group col align-self-end">
                    <h3>Create Group</h3>
                    <p>Group title:</p>
                    <input type="text" 
                            name="title"
                            className="group_input"
                            onChange={this.handleTitleChange} />
                    <div>
                        <label>Add members</label>
                        <Select
                        options={this.state.usersList}
                        onChange={this.handleChange}
                        className="select_wight"
                        isMulti
                        />
                        
                    </div>
                    <div>
                    <p>Add forms</p>
                        <FormList getForms={this.getForms} 
                                  key={this.state.title}
                                  className="form_list"
                                  state={this.state} 
                                  handleFormsChange={this.handleFormsChange}/>
                    </div>
                </form>
                <Link className='submit' to="/group">
                    <input className='btn btn-dark submit_btn' type='button' value="Submit"
                           onClick={this.handleSubmit}/>
                </Link>
            </div>
        );
    }

}
export {CreateGroup};