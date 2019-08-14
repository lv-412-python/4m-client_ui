import React, { Component } from "react";
import axios from 'axios';
import { USERS_SERVISE } from 'src/constants';

class ExpandProfile extends Component {

    addGAccount = () => {
        const url1 = `${USERS_SERVISE}/g/login`;
        const params_login = {
            method: 'expand',
            email: this.props.email
        };
        axios.get(url1,{ params:params_login, crossDomain:true, withCredentials:true }
        ).then( response => {
            window.location = response.data.url;
        }).catch( error => {
            alert(error.response.data.error);
        });
    }

    render() {
        return (
            <div className="Expand">
                <input
                    className="user-input"
                    type="button"
                    onClick={this.addGAccount}
                    value='Add Google account'/>
            </div>
        );
    }
}

export default ExpandProfile;
