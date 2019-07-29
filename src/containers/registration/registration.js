import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class Registration extends Component {
    state = {
      'email': "",
      'password': "",
      'first_name': "",
      'last_name': ""
    };

    validateForm() {
        return this.state['email'].length > 0 && this.state['password'].length > 0
            && this.state['first_name'].length > 0 && this.state['last_name'].length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {

        const user = {
          "email": this.state.email,
          "password": this.state.password,
          "first_name": this.state.first_name,
          "last_name": this.state.last_name
        };

        const url = "http://127.0.0.1:5050/users/register";

        axios.post(url, user, { crossDomain: true }
        ).then( response => {
            alert(response.data.message);
        }).catch( error => {
            alert(error.response.data['error']);
        });
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
                            value={this.state['first_name']}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="last_name">
                        <Form.Label>Last Name</Form.Label><br />
                        <Form.Control
                            autoFocus
                            type="text"
                            value={this.state['last_name']}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
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
                        value='Register'
                    />
                </Form>
            </div>
        );
    }
}

export default Registration;
