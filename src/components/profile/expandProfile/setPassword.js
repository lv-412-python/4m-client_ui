import React, { Component } from "react";

class SetPassword extends Component {

    setPassword = () => {
        this.props.history.push("/set_new_password");
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
