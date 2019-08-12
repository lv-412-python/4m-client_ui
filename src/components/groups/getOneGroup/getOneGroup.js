import React, { Component } from 'react';
import axios from 'axios';
import { AssignedToForm, EditGroup} from 'src/components/groups';
import { URL } from 'src/constants';


class GetOneGroup extends Component{
    
    state ={
        title: undefined,
        members: undefined,
        userEmail: undefined,
        owner_id: undefined,
        assigned_to_forms: undefined,
        formTitle:undefined,
        editGroup: false,
        assignedForms: false
    }

    getUsers = () => {
        const filter = this.state.members.join("&user_id=");
        const GET_USERS_URL = `http://${URL}/users?user_id=${filter}`;
        axios.get(GET_USERS_URL, { withCredentials:true }).
        // eslint-disable-next-line no-console
        then(response => {
            let userEmail = [];
            response.data.forEach((user) => {
                userEmail.push({value:user.user_id, label:user.email});

            });
            this.setState({
                userEmail: userEmail
            }); 
            }).
        // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    };


    getForms = () => {
        const filter = this.state.assigned_to_forms.join("&form_id=");
        const answer_url = `http://${URL}/form?form_id=${filter}`;
        axios.get(answer_url, {crossDomain: true, withCredentials:true}).then(response => {
            let formTitle = [];
            response.data.forEach((form)=>{
                formTitle.push(form.title);
            });
            this.setState({formTitle});
        });

    };


    getGroup = () =>{
        // eslint-disable-next-line react/prop-types
        const GET_ONE_GROUP = `http://${URL}/group/${this.props.id}`;
        axios.get(GET_ONE_GROUP, {crossDomain: true, withCredentials:true}
                 ).then(response => {
                     this.setState({...response.data});
                     this.getForms();
                     this.getUsers();
                    });
    };

    componentDidMount() {
        this.getGroup();
    }

    editGroup = (e) => {
        e.preventDefault();
        this.setState({'editGroup': !this.setState.editGroup});
    }

    assignedForms = (e) => {
        e.preventDefault();
        this.setState({'assignedForms': !this.setState.assignedForms});
    }

    render(){
        const component = this.state.editGroup && 
        <EditGroup 
        id={this.props.id}
        title={this.state.title}
        owner={this.state.owner_id}
        forms={this.state.assigned_to_forms}
        userEmail={this.state.userEmail} /> ||
        this.state.assignedForms && 
        <AssignedToForm 
        id={this.props.id} 
        assigned_to_forms={this.state.assigned_to_forms} />;


        return(
            <div>
                {component || <div>
                <h1>{this.state.title}</h1>
                <p>Members:</p>
                {this.state.userEmail && 
                this.state.userEmail.map(email=>{
                    return(
                        // eslint-disable-next-line react/prop-types
                        <li key={email.value}>{email.label}</li>
                    );
                })
                }
                <p>Assigned to forms:</p>
                {this.state.formTitle && 
                this.state.formTitle.map(form =>{return(
                    // eslint-disable-next-line react/prop-types
                    <li key={form}>{form}</li>);
                })
                }
                <button onClick={this.editGroup}>Edit</button>
                <button onClick={this.assignedForms}>Assigned to forms</button>
        </div>}
            </div>
        );
    }
}

export {GetOneGroup};
