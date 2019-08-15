import React, { Component } from "react";
import { MAIN } from 'src/constants';

class SetPassword extends Component {

    setPassword = () => {
        window.location = `${MAIN}/set_new_password`;
    }

    render() {
        return (
            <div className="Expand">
                <input
                    className="user-input"
                    type="button"
                    onClick={this.setPassword}
                    value='Set password'/>
            </div>
        );
    }
}

export default SetPassword;
