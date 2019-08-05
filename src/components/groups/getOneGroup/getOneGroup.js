import React, { Component } from 'react';
import axios from 'axios';

import GroupEdit from '../groupEdit/groupEdit';


class GetOneGroup extends Component{
    state ={
        title: undefined,
        members: undefined,
        owner: 1,
        assigned_to_forms: undefined
    }

    getData = () =>{
        // eslint-disable-next-line react/prop-types
        axios.get(`http://localhost/group/${this.props.id}`, {crossDomain: true}
                 ).then(response => {
                     this.setState({...response.data});
                 });
    };

    componentDidMount() {
        this.getData();
    }


    render(){
        return(
            <div>
                <h1>{this.state.title}</h1>
                <p>Members:</p>
                {this.state.members && 
                this.state.members.map(member=>{
                    return(
                        // eslint-disable-next-line react/prop-types
                        <li key={this.props.id}>{member}</li>
                    );
                })
                }
                <p>Assigned to forms:</p>
                {this.state.assigned_to_forms && 
                this.state.assigned_to_forms.map(form =>{return(
                    // eslint-disable-next-line react/prop-types
                    <li key={this.props.id}>{form}</li>);
                })
                }
                <GroupEdit body={this.state}
                // eslint-disable-next-line react/prop-types
                           id={this.props.id}/>
            </div>
        );
    }
}

export default GetOneGroup;
