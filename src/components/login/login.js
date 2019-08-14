import React, { Component } from "react";
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { MAIN, USERS_SERVISE } from 'src/constants';


class Login extends Component {

    state = {
      'email': "",
      'password': ""
    };

    validateForm() {
        return this.state['email'].length > 0 && this.state['password'].length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {

        const user = {
          "email": this.state.email,
          "password": this.state.password
        };

        const url = `${USERS_SERVISE}/users/login`;

        axios.post(url, user, { withCredentials:true, crossDomain: true }
        ).then( () => {
            window.location = `${MAIN}`;
        }).catch( error => {
            alert(error.response.data.error);
        });
    }

    googleAuthLogin = () => {
        const url1 = `${USERS_SERVISE}/g/login`;
        const params_login = {
            method: 'login'
        };
        axios.get(url1,{ params:params_login, crossDomain:true, withCredentials:true }
        ).then( response => {
            window.location = response.data.url;
        }).catch( error => {
            alert(error.response.data.error);
        });
    }

    componentWillMount() {
        if (cookie.load('error')) {
            alert(cookie.load('error'));
            cookie.remove('error', { path: '/' });
        }
    }


    render() {
        return (
            <div className="Login">
                <div className="align-profile">
                    <label className="users" htmlFor="email">Email:</label>
                    <input id="email"
                        className="user-input"
                        type="email"
                        value={this.state['email']}
                        onChange={this.handleChange}
                    />
                    <label className="users" htmlFor="password">Password:</label>
                    <input id="password"
                        className="user-input"
                        value={this.state['password']}
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
                    value='Sign in'
                />
                <hr className="hr-text" data-content="OR">
                </hr>
                <input
                    className="user-input"
                    type="button"
                    onClick={this.googleAuthLogin}
                    value='Sign in with Google'
                />
                <Link className="login-link" to="/registration">I am not signed up yet.</Link>
                <Link className="login-link" to="reset_password">I have forgotten my password :(</Link>
            </div>
        );
    }
}

export default Login;
