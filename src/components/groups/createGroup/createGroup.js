import React, { Component } from 'react';
import axios from 'axios';
import FormList from '../formList/formList';
import UsersAutocomplete from '../userAutocomplete/userAutocomplete';


class CreateGroup extends Component {
    
    state = {
        'forms': undefined,
        'title': undefined,
        'members': [],
        "checked_forms": new Set(),
        "user_id": [],
        "user_email": [],
        "owner_id": undefined
    };

    getForms = () => {
        const answer_url = `http://127.0.0.1/form?owner=${this.state.owner_id}`;
        axios.get(answer_url, {crossDomain: true}).then(response => {
            const forms = response.data;
            this.setState({forms});
        });
        
    };

    getUsers = () => {
        const url_to_users = 'http://127.0.0.1/users';
        axios.get(url_to_users, { withCredentials:true }).
        // eslint-disable-next-line no-console
            then(response => {
                let user_email = [];
                let user_id = [];
                response.data.forEach((user) => {
                    user_id.push(user.user_id);
                    user_email.push(user.email);
                });
                this.setState({
                    user_email: user_email,
                    user_id: user_id
                }); 
            }).
        // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    }

    getOwner = () => {
        const auth_status_url = 'http://127.0.0.1/users/status';

        axios.get(auth_status_url, {withCredentials: true}).
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
        event.preventDefault();
        const group_service_url = 'http://127.0.0.1/group';
        let data = {
            "assigned_to_forms": this.state.checked_forms,
            "title": this.state.title,
            "members": this.state.members,
            "owner_id": this.state.owner_id
        };
        axios.post(group_service_url, data).
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

    addMembers = () => {
        this.setState((prevState) => ({
            members: [...prevState.members, {"title": ""}],
        }));
    };
    

    handleMembersChange = (e) => {
        const {id, value} = e.target;
        let members = [...this.state.members];
        if(this.state.user_email.indexOf(value) >= 0){
            let email_index = this.state.user_email.indexOf(value);
            members[id] = this.state.user_id[email_index];
        }
        this.setState({members});
    };


    deleteMembers = (e) => {
        let members = [...this.state.members];
        members.splice(e.target.id, 1);
        this.setState({members});
    };

    renderButtonForMembers = () => {
        return (<div><button onClick={this.addMembers} type="button">+</button>
              {
                  this.state.members.map((val, idx) => {
                      return (
                          <div key={idx}>
                            <label>Member {idx+1}:</label>
                                <input list="users"
                                       name="browser"
                                       id={idx}
                                       onChange={this.handleMembersChange}></input>
                                    <UsersAutocomplete key={this.state.user_email}
                                                       user_email={this.state.user_email} 
                                                       user_id={this.state.user_id} />
                                <button onClick={this.deleteMembers} 
                                        id={idx}
                                        type="button">-</button>
                          </div>
                      );
                  })
              }
        </div>);
    };


    render(){
        return (
            <div>
                <h3>Create Group</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Group title:
                        <input type="text" 
                               name="title" 
                               onChange={this.handleTitleChange} />
                    </label>
                    <div>
                        <p>Add members</p>
                        {this.renderButtonForMembers()}
                    </div>
                    <div>
                    <p>Add forms</p>
                        <FormList getForms={this.getForms} 
                                  key={this.state.title} 
                                  state={this.state} 
                                  handleFormsChange={this.handleFormsChange}/>
                    </div>
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateGroup;
