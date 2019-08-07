import React, {Component} from 'react';

import FormItem from './formItem/formItem';
import FormList from './formList/formList';

class Form extends Component {
    state = {
        form_id: undefined,
        getForm: false
    };

    getForm = (e) => {
        e.preventDefault();
        this.setState({'getForm': !this.setState.getForm});
        this.setState({form_id: e.target.attributes.value.value});
    };

    render() {
        let someComponent;
        if (this.state.getForm) {
            someComponent = <FormItem form_id={this.state.form_id}/>;
        } else {
            someComponent = <FormList getForm={this.getForm}/>;
        }
        return (
            <div>
                {someComponent}
            </div>
        );
    }
}

export default Form;
