import React, { Component } from 'react';
import axios from 'axios';

class Registration extends Component {
    state = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        emailErr: "",
        passwordErr: "",
        first_nameErr: "",
        last_nameErr: ""
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
        let emailErr = "";
        let passwordErr = "";
        let first_nameErr = "";
        let last_nameErr = "";

        if (!this.state.first_name.match(/^[A-Za-z]+$/) ||
            this.state.first_name.length < 3) {
            first_nameErr = "invalid value";
        }

        if (!this.state.last_name.match(/^[A-Za-z]+$/) ||
            this.state.last_name.length < 2) {
            last_nameErr = "invalid value";
        }

        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            emailErr = "invalid email";
        }

        if (this.state.password.length < 6) {
            passwordErr = "password is too short";
        }

        if (emailErr || last_nameErr || first_nameErr || passwordErr) {
            this.setState( {emailErr, last_nameErr, first_nameErr, passwordErr} );
            return false;
        }

        return true;
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

            const url = "http://127.0.0.1/users/register";

            axios.post(url, user, { withCredentials:true }
            ).then( response => {
                alert(response.data.message);
            }).catch( error => {
                alert(error.response.data.error);
            });

            this.setState({
                emailErr: "",
                passwordErr: "",
                first_nameErr: "",
                last_nameErr: ""
            });
        }
    }

    googleAuthRegister = () => {
        const url1 = "http://127.0.0.1/g/login";
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
                <div className="first_name">
                    <label>First Name</label><br />
                    <input id="first_name"
                        type="text"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                    />
                    <div className="errorMsg">{this.state.first_nameErr}</div>
                </div>
                <div className="last_name">
                    <label>Last Name</label><br />
                    <input id="last_name"
                        type="text"
                        value={this.state.last_name}
                        onChange={this.handleChange}
                    />
                    <div className="errorMsg">{this.state.last_nameErr}</div>
                </div>
                <div className="email">
                    <label>Email</label><br />
                    <input id="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <div className="errorMsg">{this.state.emailErr}</div>
                </div>
                <div className="password">
                    <label>Password</label><br />
                    <input id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                    <div className="errorMsg">{this.state.passwordErr}</div>
                </div>
                <input
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.handleSubmit}
                    value='Register'
                />
                <input
                    type="button"
                    onClick={this.googleAuthRegister}
                    value='Register with Google'
                />
            </div>
        );
    }
}

export default Registration;
