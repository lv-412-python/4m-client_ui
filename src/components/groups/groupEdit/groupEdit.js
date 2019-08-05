import React, { Component } from 'react';
import axios from 'axios';

class GroupEdit extends Component{

    assignedGroupToForm = (e) =>{
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        const data = this.props.body;
        // eslint-disable-next-line react/prop-types
        axios.put(`http://localhost/group/${this.props.id}`, data, {crossDomain: true}
        );
    }

    render(){
        return(
            <div>
                <button onClick={this.assignedGroupToForm}>Edit</button>
            </div>
        );
    }
}

export default GroupEdit;
