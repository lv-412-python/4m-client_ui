import React, { Component } from 'react';
import axios from 'axios';

import GroupEdit from '../groupEdit/groupEdit';


class GetOneGroup extends Component{
    state ={
        title: undefined,
        members: undefined,
        owner_id: undefined,
        assigned_to_forms: undefined
    };

    getUsers = () => {
        const url_to_users = 'http://127.0.0.1/users';
        axios.get(url_to_users, { withCredentials:true }).
        // eslint-disable-next-line no-console
            then(response => {
                this.setState({
                    members: response.data
                });
            }).
        // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    };


    getForms = () => {
        const answer_url = `http://127.0.0.1/form?owner=${this.state.owner_id}`;
        axios.get(answer_url, {crossDomain: true}).then(response => {
            const assigned_to_forms = response.data;
            this.setState({assigned_to_forms});
        });

    };

    getOwner = () => {
        const auth_status_url = 'http://127.0.0.1/users/status';

        axios.get(auth_status_url, {withCredentials: true}).
            then(response => {this.setState({
                owner_id: response.data.user_id
                });
            }).
            // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    };

    getGroup = () =>{
        // eslint-disable-next-line react/prop-types
        axios.get(`http://localhost/group/${this.props.id}`, {crossDomain: true}
                 ).then(response => {
                     this.setState({...response.data});
                 }).then(()=>{this.getOwner()}).then(()=>{this.getUsers()}).then(()=>{this.getForms()});
    };

    componentDidMount() {
        this.getGroup();
    }

    render(){
        return(
            <div>
                <h1>{this.state.title}</h1>
                <p>Members:</p>
                {/* {this.state.members && 
                this.state.members.map(member=>{
                    return(
                        // eslint-disable-next-line react/prop-types
                        <li key={this.props.id}>{member}</li>
                    );
                })
                } */}
                <p>Assigned to forms:</p>
                {/* {this.state.assigned_to_forms && 
                this.state.assigned_to_forms.map(form =>{return(
                    // eslint-disable-next-line react/prop-types
                    <li key={this.props.id}>{form}</li>);
                })
                } */}
                <GroupEdit body={this.state}
                // eslint-disable-next-line react/prop-types
                           id={this.props.id}/>
            </div>
        );
    }
}

export default GetOneGroup;
