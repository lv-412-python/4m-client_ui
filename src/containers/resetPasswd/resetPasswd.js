import React, { Component } from "react";
import axios from 'axios';

class ResetPassword extends Component {
    state = {
      'email': "",
      'emailErr': ""
    };

    validateForm() {
        return this.state['email'].length > 0;
    }

    validate = () =>  {
        let emailErr = "";

        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            emailErr = "invalid email";
        }
        if (emailErr) {
            this.setState( {emailErr} );
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
            const emailData = {
                "email": this.state.email
            };

            const url = "http://127.0.0.1/reset_password";

            axios.post(url, emailData, { withCredentials:true, crossDomain: true }
            ).then( response => {
                alert(response.data.message);
                window.location = "http://127.0.0.1:3000/login";
            }).catch( error => {
                alert(error.response.data.error);
            });

            this.setState({
                emailErr: ""
            });
        }
    }

    render() {
        return (
            <div className="ResetPassword">
                <div className="email">
                    <label>Enter your email:</label><br />
                    <input id="email"
                        type="email"
                        value={this.state['email']}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="errorMsg">{this.state.emailErr}</div>
                <input
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.handleSubmit}
                    value='Send reset request'
                />
            </div>
        );
    }
}

export default ResetPassword;
