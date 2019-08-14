import React, { Component } from "react";
import axios from 'axios';
import cookie from 'react-cookies';

class Logout extends Component {

    handleSubmit = event => {
        const url = "http://127.0.0.1/users/logout";

        axios.post(url,  { withCredentials:true }
        ).then( () => {
            cookie.remove('session', { path: '/' });
            cookie.remove('admin', { path: '/' });
            cookie.remove('has_passwd', { path: '/' });
            cookie.remove('url_to', { path: '/' });
            window.location = "http://127.0.0.1:3000/signin";
        });

        event.preventDefault();
    }

    render() {
        return (
            <div className="Logout">
            <input
                type="button"
                onClick={this.handleSubmit}
                value='Sign out'
            />
            </div>
        );
    }
}

export default Logout;
