import React, { Component } from 'react';
import axios from 'axios';


class FieldEdit extends Component {
    state = {
        // eslint-disable-next-line react/prop-types
        'id': this.props.id,
        'title': null,
        'has_choice': null,
        'is_multichoice': null,
        'has_autocomplete': null,
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
                    has_autocomplete: field.has_autocomplete,
                    choices: field.choices,
                    };
            }
            else {
                object = {
                    title: field.title,
                    has_choice:field.has_choice,
                    is_multichoice: field.is_multichoice,
                    has_autocomplete: field.has_autocomplete,
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
        const url = `http://127.0.0.1/field/${this.state.id}`;
        axios.put(url, this.state).
            then(() => { window.location.reload() }).
        // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    };

    render () {
        return (<form onSubmit={this.handleSubmit}>
              <label>
                Title:
                  <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
              </label>
              <label>
                Has autocomplete:
                  <input name="has_autocomplete"
                         type="checkbox"
                         checked={this.state.has_autocomplete}
                         onChange={this.handleInputChange} />
              </label>
              <label>
                Has choices:
                  <input name="has_choice"
                         type="checkbox"
                         checked={this.state.has_choice} />
              </label>
            {
                this.state.has_choice ? this.state.choices.map((el, id) => <input key={id} type="text" id={id} value={el.title} onChange={this.handleChoiceChange} />): null
            }
              <label>
                  Is multichoice:
                  <input name="is_multichoice"
                      type="checkbox"
                      checked={this.state.is_multichoice}
                      onChange={this.handleInputChange} />
              </label>
            <input className='btn btn-outline-dark' type="submit" value="Save" />
          </form>);
    }
}

export default FieldEdit;
