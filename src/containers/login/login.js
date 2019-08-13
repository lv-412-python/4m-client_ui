import React, { Component } from "react";
import axios from 'axios';
import cookie from 'react-cookies';


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

        const url = "http://127.0.0.1/users/login";

        axios.post(url, user, { withCredentials:true, crossDomain: true }
        ).then( () => {
            window.location = "http://127.0.0.1:3000";
        }).catch( error => {
            alert(error.response.data.error);
        });
    }

    googleAuthLogin = () => {
        const url1 = "http://127.0.0.1/g/login";
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
                <div className="email">
                    <label>Email</label><br />
                    <input id="email"
                        type="email"
                        value={this.state['email']}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="password">
                    <label>Password</label><br />
                    <input id="password"
                        value={this.state['password']}
                        onChange={this.handleChange}
                        type="password"
                    />
                </div>
                <input
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.handleSubmit}
                    value='Sign in'
                />
                <input
                    type="button"
                    onClick={this.googleAuthLogin}
                    value='Sign in with Google'
                /><br />
                <a href="/registration">I am not signed up yet.</a><br />
                <a href="/reset_password">I have forgotten my password :(</a>
            </div>
        );
    }
}

export default Login;
