import React, { Component } from 'react';
import axios from 'axios';

import AsignedFormItem from './asignedFormItem';


class AsignedForms extends Component {
    state = {
        userId: undefined,
        asignedFormsID: [],
        asignedForms: []
    }

    getUser = () => {
        const userProfileURL = 'http://127.0.0.1/users/profile';
        axios.get(userProfileURL, {
            crossDomain: true,
            withCredentials: true
            }).then(response => {
            this.setState({userId: response.data.user_id}, () => {
                this.getFormsId();
            });
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
    };

    getFormsId = () => {
        const groupsURL =  `http://127.0.0.1/group`;
        axios.get(groupsURL,{
            params: {user_id: this.state.userId},
            crossDomain: true,
            withCredentials: true
        }).then(response => {
            this.setState({asignedFormsID: response.data.assigned_to_forms}, () => {
                this.getForms();
            });
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
    }

    getForms = () => {
        const filter = this.state.asignedFormsID.join("&form_id=");
        const formURL = `http://127.0.0.1/form?form_id=${filter}`;
        axios.get(formURL,{
            crossDomain: true,
            withCredentials: true
        }).then(response => {
            this.setState({asignedForms: response.data});
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
    }

    componentDidMount() {
        this.getUser();
    }

    render(){
        return(
            <div>
                <p>User_id: {this.state.userId}</p>
                {(this.state.asignedForms &&
                    <div>
                        {this.state.asignedForms.map(form => {
                            // eslint-disable-next-line react/prop-types
                            return (<AsignedFormItem key={form.form_id}
                                                     title={form.title}
                                                     form_id={form.form_id}
                                                     description={form.description}
                            />);
                        })
                        }
                    </div>)}
            </div>
        );
    }
}
export default AsignedForms;
