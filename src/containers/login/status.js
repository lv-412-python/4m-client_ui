import React, { Component } from "react";
import axios from 'axios';

class Status extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        create_date: "",
        update_date: ""
    };

    componentWillMount() {
        const url = "http://127.0.0.1/users/profile";

        axios.get(url, { withCredentials:true }
        ).then(response=> {
            this.setState({...response.data});
        }).catch(error => {
            alert(error.response.data.error);
        });
    }

    render() {
        return (
            <div className="Status">
                <div className="first_name">
                    <label>First Name:</label>
                    &nbsp;<label>{this.state.first_name}</label>
                    <br />
                </div>
                <div className="last_name">
                    <label>Last Name</label>
                    &nbsp;<label>{this.state.last_name}</label>
                    <br />
                </div>
                <div className="email">
                    <label>Email:</label>
                    &nbsp;<label>{this.state.email}</label>
                    <br />
                </div>
                <div className="create_date">
                    <label>Created:</label>
                    &nbsp;<label>{this.state.create_date.slice(0, 10)}</label>
                    <br />
                </div>
            </div>
        );
    }
}

export default Status;
