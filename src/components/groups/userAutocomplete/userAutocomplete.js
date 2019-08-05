import React from 'react';


const UsersAutocomplete = props => (
    <datalist id="users">
        {
            // eslint-disable-next-line react/prop-types
            props.users.map((user) => {
            return (<option key={user.user_id} value={user.email}></option>);
        })
    }
    </datalist>
);


export default UsersAutocomplete;