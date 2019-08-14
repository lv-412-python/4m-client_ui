import { Component } from "react";
import axios from 'axios';
import cookie from 'react-cookies';
import { MAIN, USERS_SERVISE } from 'src/constants';

class Logout extends Component {

    componentWillMount() {
        const url = `${USERS_SERVISE}/users/logout`;

        axios.post(url,  { withCredentials:true }
        ).then( () => {
            cookie.remove('session', { path: '/' });
            cookie.remove('admin', { path: '/' });
            alert("Successfully signed out.");
            window.location = `${MAIN}/signin`;
        });
    }

    render() {
        return null;
    }
}

export default Logout;
