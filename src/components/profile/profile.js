import React, { Component } from "react";
import axios from 'axios';
import cookie from 'react-cookies';
import { USERS_SERVISE } from 'src/constants';

import ExpandProfile from './expandProfile/expandProfile';
import SetPassword from './expandProfile/setPassword';

import './profile.css';

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
        const url = `${USERS_SERVISE}/users/profile`;
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
            <div className="Profile">
                <div className="align-profile">
                    <div className="one-value">
                        <label>First Name:</label>
                        <label className="profile-value">{this.state.first_name}</label>
                    </div>

                    <div className="one-value">
                        <label>Last Name:</label>
                        <label className="profile-value">{this.state.last_name}</label>
                    </div>

                    <div className="one-value">
                        <label>Email:</label>
                        <label className="profile-value">{this.state.email}</label>
                    </div>

                    <div className="one-value">
                        <label>Role:</label>
                        <label className="profile-value" title={this.state.role['role_description']}>
                            {this.state.role['role_name']}
                        </label>
                    </div>

                    <div className="one-value">
                        <label>Created:</label>
                        <label className="profile-value">{this.state.create_date.slice(0, 10)}</label>
                    </div>

                    <div className="one-value">
                        <label>Google account binded:</label>
                        <label className="profile-value">{this.state.google_id ? "yes": "no"}</label>
                    </div>
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
