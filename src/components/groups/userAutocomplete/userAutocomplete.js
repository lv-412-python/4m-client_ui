import React, {Component} from 'react';


class UsersAutocomplete extends Component {


    render() {
        return <datalist id="users">
            {
            // eslint-disable-next-line react/prop-types
                this.props.user_email.map((email, index) => {
                return (<option key={index} value={email}></option>);
                })
            }
                </datalist>;
    }
}

export default UsersAutocomplete;