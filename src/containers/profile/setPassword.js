import React, { Component } from "react";

class SetPassword extends Component {

    setPassword = () => {
        window.location = "http://127.0.0.1:3000/set_new_password";
    }

    render() {
        return (
            <div className="Expand">
                <input type="button" onClick={this.setPassword} value='Set password'/>
            </div>
        );
    }
}

export default SetPassword;
