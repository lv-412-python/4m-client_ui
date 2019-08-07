import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class Status extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        create_date: "",
        update_date: ""
    };

    componentWillMount() {
        const url = "http://127.0.0.1/users/profile";

        axios.get(url, { withCredentials:true }
        ).then(response=> {
            this.setState({...response.data});
        }).catch(error => {
            alert(error.response.data.error);
        });
    }

    render() {
        return (
            <div className="Status">
                <Form>
                    <Form.Group controlId="first_name">
                        <Form.Label>First Name</Form.Label><br />
                        <Form.Text>
                            {this.state.first_name}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="last_name">
                        <Form.Label>Last Name</Form.Label><br />
                        <Form.Text>
                            {this.state.last_name}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label><br />
                        <Form.Text>
                            {this.state.email}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="create_date">
                        <Form.Label>Created</Form.Label><br />
                        <Form.Text>
                            {this.state.create_date}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="update_date">
                        <Form.Label>Updated</Form.Label><br />
                        <Form.Text>
                            {this.state.update_date}
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>
        );
    }

}

export default Status;
