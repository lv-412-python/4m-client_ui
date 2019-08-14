import React, { Component } from "react";
import axios from 'axios';
import cookie from 'react-cookies';

import ExpandProfile from './expandProfile';
import SetPassword from './setPassword';

class Profile extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        passwd: null,
        role: "",
        google_id: "",
        create_date: "",
        showExpand: null
    };

    componentWillMount() {
        const url = "http://127.0.0.1/users/profile";
        cookie.remove('email', { path: '/' });
        cookie.remove('url_to', { path: '/' });
        axios.get(url, { withCredentials:true }
        ).then(response=> {
            this.setState({...response.data});
            if (cookie.load('error')) {
                alert(cookie.load('error'));
                cookie.remove('error', { path: '/' });
            }
            if (cookie.load('has_passwd') == "False") {
                this.setState({
                    passwd: <SetPassword />
                });
            } else {
                this.setState({
                    passwd: null
                });
            }
            if (this.state.google_id) {
                this.setState({
                    showExpand: null
                });
            } else {
                this.setState({
                    showExpand: <ExpandProfile
                                    email={this.state.email}
                                    google_id={this.state.google_id}
                                    passwd={this.state.passwd}
                                />
                });
            }
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
                    <label>Last Name:</label>
                    &nbsp;<label>{this.state.last_name}</label>
                    <br />
                </div>
                <div className="email">
                    <label>Email:</label>
                    &nbsp;<label>{this.state.email}</label>
                    <br />
                </div>
                <div className="role">
                    <label>Role:</label>
                    &nbsp;<label title={this.state.role['role_description']}>
                        {this.state.role['role_name']}
                    </label>
                    <br />
                </div>
                <div className="create_date">
                    <label>Created:</label>
                    &nbsp;<label>{this.state.create_date.slice(0, 10)}</label>
                    <br />
                </div>
                <div className="google_acc">
                    <label>Google account binded:</label>
                    &nbsp;<label>{this.state.google_id ? "yes": "no"}</label>
                    <br />
                </div>
                <div className="show_expanding">
                    {this.state.passwd}
                    {this.state.showExpand}
                </div>
            </div>
        );
    }
}

export default Profile;
