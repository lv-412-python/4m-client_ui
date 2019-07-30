import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import cookie from 'react-cookies';

class Logout extends Component {

    handleSubmit = event => {
        const url = "http://127.0.0.1/users/logout";

        axios.post(url,  { withCredentials:true }
        ).then(response => {
            cookie.remove('session', { path: '/' });
            alert(response.data.message);
        });

        event.preventDefault();
    }

    render() {
        return (
            <div className="Logout">
                <Form onSubmit={this.handleSubmit}>
                    <Button
                        block
                        type="submit"
                    >
                        Logout
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Logout;
