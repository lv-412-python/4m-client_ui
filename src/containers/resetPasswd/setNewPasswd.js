import React, { Component } from "react";
import axios from 'axios';
import queryString from 'query-string';

class SetNewPassword extends Component {
    state = {
      'password': "",
      'passwordTwo': "",
      'passwordErr': "",
      'passwordTwoErr': ""
    };

    validateForm() {
        return this.state['password'].length > 0 && this.state['passwordTwo'].length > 0;
    }

    validate = () => {
        let passwordErr = "";
        let passwordTwoErr = "";

        if (this.state.password.length < 6) {
            passwordErr = "password is too short";
        }
        if (this.state.password != this.state.passwordTwo) {
            passwordTwoErr = "repeat password correctly";
        }
        if (passwordErr || passwordTwoErr) {
            this.setState( {passwordErr, passwordTwoErr} );
            return false;
        }

        return true;
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
                url = "http://127.0.0.1/users/profile";
                redir = "http://127.0.0.1:3000/profile";
            } else {
                url = `http://127.0.0.1/reset_password?token=${values.token}`;
                redir = "http://127.0.0.1:3000/login";
            }
            axios.put(url, newPassword, { withCredentials:true, crossDomain: true }
            ).then( response => {
                alert(response.data.message);
                window.location = redir;
            }).catch( error => {
                alert(error.response.data.error);
            });

            this.setState({
                passwordErr: "",
                passwordTwoErr: "",
            });
        }
    }

    render() {
        return (
            <div className="ResetPassword">
                <div className="password">
                    <label>Password</label><br />
                    <input id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                    <div className="errorMsg">{this.state.passwordErr}</div>
                </div>
                <div className="password">
                    <label>Submit password</label><br />
                    <input id="passwordTwo"
                        value={this.state.passwordTwo}
                        onChange={this.handleChange}
                        type="password"
                    />
                    <div className="errorMsg">{this.state.passwordTwoErr}</div>
                    <input
                        disabled={!this.validateForm()}
                        type="button"
                        onClick={this.handleSubmit}
                        value='Set new password'
                    />
                </div>
            </div>
        );
    }
}

export default SetNewPassword;
