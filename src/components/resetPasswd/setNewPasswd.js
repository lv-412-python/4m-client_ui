import React, { Component } from "react";
import axios from 'axios';
import queryString from 'query-string';
import { MAIN, USERS_SERVISE } from 'src/constants';

class SetNewPassword extends Component {
    state = {
      'password': "",
      'passwordTwo': ""
    };

    validateForm() {
        return this.state['password'].length > 0 && this.state['passwordTwo'].length > 0;
    }

    validate = () => {
        let passwordValid = true;
        let passwordTwoValid = true;

        if (this.state.password.length < 6) {
            passwordValid = false;
            // eslint-disable-next-line no-undef
            password.setCustomValidity("Password is too short.");
        } else {
            // eslint-disable-next-line no-undef
            password.setCustomValidity("");
        }
        if (this.state.password != this.state.passwordTwo) {
            passwordTwoValid = false;
            // eslint-disable-next-line no-undef
            passwordTwo.setCustomValidity("Repeat password correctly.");
        } else {
            // eslint-disable-next-line no-undef
            passwordTwo.setCustomValidity("");
        }

        if (passwordValid && passwordTwoValid) {
            return true;
        }

        return false;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const newPassword = {
                "password": this.state.password
            };
            // eslint-disable-next-line react/prop-types
            const values = queryString.parse(this.props.location.search);
            let url, redir;
            if (values.token == undefined) {
                url = `${USERS_SERVISE}/users/profile`;
                redir = `${MAIN}/profile`;
            } else {
                url = `${USERS_SERVISE}/reset_password?token=${values.token}`;
                redir = `${MAIN}/signin`;
            }
            axios.put(url, newPassword, { withCredentials:true, crossDomain: true }
            ).then( response => {
                alert(response.data.message);
                window.location = redir;
            }).catch( error => {
                alert(error.response.data.error);
            });
        }
    }

    render() {
        return (
            <div className="ResetPassword">
                <div className="align-profile">
                    <label className="users" htmlFor="password">Password:</label><br />
                    <input id="password"
                        className="user-input"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                    <label className="users" htmlFor="passwordTwo">Submit password:</label><br />
                    <input id="passwordTwo"
                        className="user-input"
                        value={this.state.passwordTwo}
                        onChange={this.handleChange}
                        type="password"
                    />
                </div>
                <input
                    className="user-input"
                    id="users-btn"
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.handleSubmit}
                    value='Set new password'
                />
            </div>
        );
    }
}

export default SetNewPassword;
