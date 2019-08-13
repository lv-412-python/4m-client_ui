import React, { Component } from "react";
import axios from 'axios';

class ExpandProfile extends Component {

    addGAccount = () => {
        const url1 = "http://127.0.0.1/g/login";
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
                <input type="button" onClick={this.addGAccount} value='Add Google account'/>
            </div>
        );
    }
}

export default ExpandProfile;
