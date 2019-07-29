import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const initialState = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    emailErr: "",
    passwordErr: "",
    first_nameErr: "",
    last_nameErr: ""
}

class Registration extends Component {
    state = initialState;

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

        if (!this.state.first_name.match(/^[A-Za-z]+$/)) {
            first_nameErr = "invalid value";
        }

        if (!this.state.last_name.match(/^[A-Za-z]+$/)) {
            last_nameErr = "invalid value";
        }

        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            emailErr = "invalid email";
        }

        if (!this.state.password.length < 6) {
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
        const isValid = this.Validate();
        if (isValid) {
            const user = {
              "email": this.state.email,
              "password": this.state.password,
              "first_name": this.state.first_name,
              "last_name": this.state.last_name
            };

            const url = "http://127.0.0.1:5050/users/register";

            axios.post(url, user, { withCredentials:true }
            ).then( response => {
                alert(response.data['isLoggedIn']);
                // document.cookie = 'session=' + response.data['token'];
                // window.location = "http://127.0.0.1:80/";
            }).catch( error => {
                alert(error.response.data['error']);
            });

            this.setState(initialState);
        }
    }


    render() {
        return (
            <div className="Register">
                <Form>
                    <Form.Group controlId="first_name">
                        <Form.Label>First Name</Form.Label><br />
                        <Form.Control
                            autoFocus
                            type="text"
                            value={this.state.first_name}
                            onChange={this.handleChange}
                        />
                        <div class="errorMsg">{this.state.first_nameErr}</div>
                    </Form.Group>
                    <Form.Group controlId="last_name">
                        <Form.Label>Last Name</Form.Label><br />
                        <Form.Control
                            autoFocus
                            type="text"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                        />
                        <div class="errorMsg">{this.state.last_nameErr}</div>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label><br />
                        <Form.Control
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <div class="errorMsg">{this.state.emailErr}</div>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label><br />
                        <Form.Control
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                        <div class="errorMsg">{this.state.passwordErr}</div>
                    </Form.Group>
                    <input

                        disabled={!this.validateForm()}
                        type="button"
                        onClick={this.handleSubmit}
                        value='Register'
                    />
                </Form>
            </div>
        );
    }
}

export default Registration;
