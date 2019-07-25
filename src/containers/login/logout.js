import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import cookie from 'react-cookies';

class Logout extends Component {

    handleSubmit = event => {
        const url = "http://127.0.0.1:80/users/logout";

        axios.post(url,  {crossDomain:true}
        ).then(function () {
            cookie.remove('session', { path: '/' });
            // window.location = "http://127.0.0.1:3000/";
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
