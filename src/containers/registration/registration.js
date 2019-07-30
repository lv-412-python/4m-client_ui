import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
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

        const url = "http://127.0.0.1/users/register";

        axios.post(url, user, { crossDomain: true }
        ).then( response => {
            alert(response.data.message);
        }).catch( error => {
            alert(error.response.data['error']);
        });

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
>>>>>>> aa9d23bb26d4988d438008dc0cc313c6cccc48c8
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
                        <div className="errorMsg">{this.state.first_nameErr}</div>
                    </Form.Group>
                    <Form.Group controlId="last_name">
                        <Form.Label>Last Name</Form.Label><br />
                        <Form.Control
                            autoFocus
                            type="text"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                        />
                        <div className="errorMsg">{this.state.last_nameErr}</div>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label><br />
                        <Form.Control
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <div className="errorMsg">{this.state.emailErr}</div>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label><br />
                        <Form.Control
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                        <div className="errorMsg">{this.state.passwordErr}</div>
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
