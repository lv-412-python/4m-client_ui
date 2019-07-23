import React, { Component } from 'react';
import axios from 'axios';

class PostField extends Component
{
    state = {
        'title': null,
        'has_autocomplete': false,
        'has_choice': false,
        'is_multichoice': false
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) =>  {
        axios.post('http://172.17.0.2:5053/field', this.state).
            then(function (response) { console.log(response) }).
            catch(function (error) { console.log(error) });
        alert('Submitted: ' + this.state.value);
        event.preventDefault();
    };

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <label>
                Title:
                  <input type="text" name="title" value={this.state.value} onChange={this.handleInputChange} />
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
                         checked={this.state.has_choice}
                         onChange={this.handleInputChange} />
              </label>
              <label>
                Is multichoice:
                  <input name="is_multichoice"
                         type="checkbox"
                         checked={this.state.is_multichoice}
                         onChange={this.handleInputChange} />
              </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}

export default PostField;
