import React, {Component} from 'react';
import axios from 'axios';
import FormListItem from "src/components/forms/formListItem/formListItem";
import ButtonNew from "src/components/forms/buttonNewForm/buttonNewForm";

import './formList.css';

class FormList extends Component {
    state = {
        forms: undefined,
        status: undefined,
        // title: undefined,
        // description: undefined,
        // form_id: undefined,
        owner: undefined
    };

    getOwner = () => {
        const auth_status_url = 'http://127.0.0.1/users/profile';

        axios.get(auth_status_url, {
            crossDomain: true,
            withCredentials: true
            }).then(response => {
            this.setState({
                owner: response.data.user_id
            }, () => {
                this.getForms();
            });
        }).
        catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
    };

    getForms = () => {
        const owner = this.state.owner;
        const forms_url = `http://127.0.0.1/form`;
        axios.get(forms_url, {params: {owner: owner}, withCredentials: true},
            {withCredentials: true}, {crossDomain: true} ).then(response => {
            const forms = response.data;
            const status = response.status;
            this.setState({status});
            this.setState({forms});
        });
    };

    componentDidMount() {
        this.getOwner();
    }

    render() {
        return (
            <div className='form-list'>
                {(this.state.forms &&
                    <div>
                        {this.state.forms.map(form => {
                            // eslint-disable-next-line react/prop-types
                            return (<FormListItem getForm={this.props.getForm}
                                                  key={form.form_id}
                                                  title={form.title}
                                                  form_id={form.form_id}
                                                  description={form.description}
                            />);
                        })
                        }
                    </div>)}
                <ButtonNew/>
            </div>
        );
    }
}

export default FormList;
