import React, { Component } from 'react';
import axios from 'axios';

class PostField extends Component
{
    state = {
        'title': null,
        'has_autocomplete': false,
        'has_choice': false,
        'is_multichoice': false,
        'choices': []
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
        event.preventDefault();
        axios.post('http://172.17.0.2:5053/field', this.state).
            then(function (response) { console.log(response) }).
            catch(function (error) { console.log(error) });
        alert('Submitted: ' + this.state.title);
    };

    addChoice = () => {
        this.setState((prevState) => ({
            choices: [...prevState.choices, {"title": ""}],
        }));
    };

    handleChoiceChange = (e) => {
        const {id, value} = e.target;
       let choices = [...this.state.choices];
        choices[id].title = value;
       this.setState({choices});
    };

    render() {
        let {choices} = this.state;
        return (
          <form onSubmit={this.handleSubmit}>
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
                         checked={this.state.has_choice}
                         onChange={this.handleInputChange} />
              </label>
              <button onClick={this.addChoice} type="button">+</button>
              {
                  choices.map((val, idx) => {
                      return (
                          <div key={idx}>
                              <label htmlFor={idx}>Choice {idx+1}:</label>
                                  <input type="text"
                                         id={idx}
                                         value={choices[idx].title}
                                         onChange={this.handleChoiceChange}
                                  />
                          </div>
                      );
                  })
              }
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
