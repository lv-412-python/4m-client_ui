import React, { Component } from 'react';
import axios from 'axios';


class FieldEdit extends Component {
    state = {
        // eslint-disable-next-line react/prop-types
        'id': this.props.id,
        'title': null,
        'has_choice': null,
        'is_multichoice': null,
        'choices': [],
    };

    componentDidMount() {
        const url = `http://127.0.0.1/field/${this.state.id}`;
        axios.get(url).then(response => {
            const field = response.data;
            let object = null;
            if (field.has_choice)
            {
                object = {
                    title: field.title,
                    has_choice:field.has_choice,
                    is_multichoice: field.is_multichoice,
                    choices: field.choices
                    };
            }
            else {
                object = {
                    title: field.title,
                    has_choice:field.has_choice,
                    is_multichoice: field.is_multichoice
                    };
            }
            this.setState(object);
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleChoiceChange = (e) => {
        const {id, value} = e.target;
        let choices = [...this.state.choices];
        choices[id].title = value;
        this.setState({choices});
    };

    handleSubmit = (event) =>  {
        event.preventDefault();
        const auth_status_url = 'http://127.0.0.1/users/status';
        axios.get(auth_status_url, {withCredentials: true}).then(response => {
            let owner = response.data.user_id;
            const url = `http://127.0.0.1/field/${this.state.id}`;
            const data = {
                'title': this.state.title,
                'has_autocomplete': this.state.has_autocomplete,
                'has_choice': this.state.has_choice,
                'is_multichoice': this.state.is_multichoice,
                'choices': this.state.choices,
                'owner': owner
            };
            axios.put(url, data).
            then(() => { window.location.reload() }).
            // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
        });
    };

    render () {
        return (
            <form onSubmit={this.handleSubmit} className='field_form'>
              <label>
                Title:
                  <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
              </label>
                {
                    this.state.has_choice &&
                        <div>
                            {
                                this.state.choices.map((el, id) =>
                                    <div key={id}>Choice {id + 1}: <input key={id} type="text" id={id} value={el.title}
                                           onChange={this.handleChoiceChange}/>
                                    </div>)
                            }
                            <label>
                                Is multichoice:
                                <input name="is_multichoice"
                                       type="checkbox"
                                       checked={this.state.is_multichoice}
                                       onChange={this.handleInputChange}/>
                            </label>
                        </div>
                }
                <input className='btn btn-outline-dark field_form_btn' type="submit" value="Save" />
          </form>);
    }
}

export default FieldEdit;
