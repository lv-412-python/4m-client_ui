import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios';


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

        const url = "http://127.0.0.1:5050/users/login";

        axios.post(url, user, { withCredentials:true }
        ).then( response => {
            // document.cookie = 'session=' + response.data['token'];
            alert(response.data['isLoggedIn']);
            // window.location = "http://127.0.0.1:3000/";
        }).catch( error => {
            // alert(error.response.data['error']);
        });
    }


    render() {
        return (
            <div className="Login">
                <Form>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label><br />
                        <Form.Control
                            autoFocus
                            type="email"
                            value={this.state['email']}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label><br />
                        <Form.Control
                            value={this.state['password']}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </Form.Group>
                    <input

                        disabled={!this.validateForm()}
                        type="button"
                        onClick={this.handleSubmit}
                        value='Login'
                    />
                </Form>
            </div>
        );
    }
}

export default Login;
