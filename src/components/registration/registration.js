import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { MAIN, USERS_SERVISE } from 'src/constants';

import './registration.css';

class Registration extends Component {
    state = {
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    }

    validateForm() {
        return this.state['email'].length > 0 && this.state['password'].length > 0
            && this.state['first_name'].length > 0 && this.state['last_name'].length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validate = () => {
        let emailValid = true;
        let passwordValid = true;
        let first_nameValid = true;
        let last_nameValid = true;

        if (!this.state.first_name.match(/^[A-Za-z]+$/) ||
            this.state.first_name.length < 3) {
            first_nameValid = false;
            // eslint-disable-next-line no-undef
            first_name.setCustomValidity("Invalid value: is too short or contains not only letters.");
        } else {
            // eslint-disable-next-line no-undef
            first_name.setCustomValidity("");
        }

        if (!this.state.last_name.match(/^[A-Za-z]+$/) ||
            this.state.last_name.length < 2) {
            last_nameValid = false;
            // eslint-disable-next-line no-undef
            last_name.setCustomValidity("Invalid value: is too short or contains not only letters.");
        } else {
            // eslint-disable-next-line no-undef
            last_name.setCustomValidity("");
        }

        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            emailValid = false;
            // eslint-disable-next-line no-undef
            email.setCustomValidity("Invalid email.");
        } else {
            // eslint-disable-next-line no-undef
            email.setCustomValidity("");
        }

        if (this.state.password.length < 6) {
            passwordValid = false;
            // eslint-disable-next-line no-undef
            password.setCustomValidity("Password is too short.");
        } else {
            // eslint-disable-next-line no-undef
            password.setCustomValidity("");
        }

        if (emailValid && last_nameValid && first_nameValid && passwordValid) {
            return true;
        }

        return false;
    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const user = {
              "email": this.state.email,
              "password": this.state.password,
              "first_name": this.state.first_name,
              "last_name": this.state.last_name
            };

            const url = `${USERS_SERVISE}/users/register`;

            axios.post(url, user, { withCredentials:true }
            ).then( response => {
                alert(response.data.message);
                window.location=`${MAIN}`;
            }).catch( error => {
                alert(error.response.data.error);
            });
        }
    }

    googleAuthRegister = () => {
        const url1 = `${USERS_SERVISE}/g/login`;
        const params_login = {
            method: 'register'
        };
        axios.get(url1,{ params:params_login, crossDomain:true, withCredentials:true }
        ).then( response => {
            window.location = response.data.url;
        }).catch( error => {
            alert(error.response.data.error);
        });
    }


    render() {
        return (
            <div className="Register">
                <div className="align-profile">
                    <label className="users" htmlFor="first_name">First Name:</label>
                    <input id="first_name"
                        className="user-input"
                        type="text"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                    />
                    <label className="users" htmlFor="last_name">Last Name:</label><br />
                    <input id="last_name"
                        className="user-input"
                        type="text"
                        value={this.state.last_name}
                        onChange={this.handleChange}
                    />
                    <label className="users" htmlFor="email">Email:</label><br />
                    <input id="email"
                        className="user-input"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label className="users" htmlFor="password">Password:</label><br />
                    <input id="password"
                        className="user-input"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </div>
                <input
                    id="users-btn"
                    className="user-input"
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.handleSubmit}
                    value='Register'
                />
                <hr className="hr-text" data-content="OR">
                </hr>
                <input
                    className="user-input"
                    type="button"
                    onClick={this.googleAuthRegister}
                    value='Register with Google'
                />
                <Link className="login-link" to="/signin">I already have an account.</Link>
            </div>
        );
    }
}

export default Registration;
