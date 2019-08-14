import React, { Component } from 'react';
import axios from 'axios';
import {URL} from 'src/constants';
import "./assignedToForm.css"


class AssignedToForm extends Component {

    state = {
        id: this.props.id,
        owner_id: undefined,
        forms: [],
        checked_forms: this.props.assigned_to_forms
    }

    handleFormsChange = (form, event) => {
        const checked = event.target.checked;
        if(checked){
            let checked_forms = [...this.state.checked_forms];
            checked_forms.push(form.form_id);
            this.setState({checked_forms});
        }
        else{
            let checked_forms = [...this.state.checked_forms];
            checked_forms.map((checked_form, index) => {
                if(checked_form === form.form_id){
                    checked_forms.splice(index, 1);
                }
            });
            this.setState({checked_forms});
        }
    }

    getOwner = () => {
        const AUTH_STATUS_URL = `http://${URL}/users/profile`;
        axios.get(AUTH_STATUS_URL, {withCredentials: true}).
            then(response => {
                this.setState({
                owner_id: response.data.user_id
                }, () => {this.getForms()}); 
            }).
            // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    };
    
    getForms = () => {
        const OWNER_FORM_URL = `http://${URL}/form?owner=${this.state.owner_id}`;
        axios.get(OWNER_FORM_URL, {crossDomain: true, withCredentials: true}).then(response => {
            const forms = response.data;
            this.setState({forms});
        });
        
    };

    componentDidMount() {
        this.getOwner();
    }
    

    handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            "assigned_to_forms": this.state.checked_forms
        };
        const GROUP_PUT_URL = `http://${URL}/group/${this.state.id}`; 
        axios.put(GROUP_PUT_URL, data, {withCredentials: true, crossDomain: true}).
            then(response => {
            // eslint-disable-next-line no-console
                console.log(response); 
            }).
            // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    }

    render() {
        return (
            <form className="forms_list">
            {    // eslint-disable-next-line react/prop-types
                this.state.forms && this.state.forms.map((form) => {
                    if (this.state.checked_forms.indexOf(form.form_id) >= 0) {
                        return   (
                            <div key={form.form_id}>
                                <input type="checkbox"
                                checked={true}
                                className="qwerty"
                                id={form.form_id} 
                                value={form.form_id}
                                onChange={(
                                    // eslint-disable-next-line react/prop-types
                                        (e) => this.handleFormsChange(form, e)
                                    )}></input>
                                <label htmlFor={form.form_id}>{form.title}</label>
                            </div>);
                    } else{
                        return   (
                            <div key={form.form_id}>
                                <input type="checkbox" 
                                id={form.form_id} 
                                value={form.form_id}
                                checked={false} 
                                className="qwerty"
                                onChange={(
                                    // eslint-disable-next-line react/prop-types
                                        (e) => this.handleFormsChange(form, e)
                                    )}></input>
                                <label htmlFor={form.form_id}>{form.title}</label>
                            </div>);
                    }
                    
            })
        }
        <input type="submit" onClick={this.handleSubmit} value="Submit"/>
        </form>);
    }
}

export {AssignedToForm};