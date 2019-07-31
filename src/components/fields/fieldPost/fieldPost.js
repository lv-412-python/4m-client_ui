import React, {Component} from 'react';
import axios from 'axios';

import './fieldPost.css';

class PostField extends Component {
    state = {
        'text': true,
        'dropdown': false,
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

    handleTypeChange = () => {
        this.setState({
            text: !this.state.text,
            dropdown: !this.state.dropdown,
            has_autocomplete: !this.state.has_autocomplete,
            has_choice: !this.state.has_choice
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://127.0.0.1/field';
        const data = {
            'title': this.state.title,
            'has_autocomplete': this.state.has_autocomplete,
            'has_choice': this.state.has_choice,
            'is_multichoice': this.state.is_multichoice,
            'choices': this.state.choices
        };
        axios.post(url, data).then(() => {
            window.location.reload();
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
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

    deleteChoice = (e) => {
        let choices = [...this.state.choices];
        choices.splice(e.target.id, 1);
        this.setState({choices});
    };

    renderButton = () => {
        return (
            <div>
                <button className='btn btn-outline-dark plus_btn' onClick={this.addChoice} type="button">+</button>
                {
                    this.state.choices.map((val, idx) => {
                        return (
                            <div key={idx}>
                                <label>Choice {idx + 1}:</label>
                                <input type="text"
                                       id={idx}
                                       value={this.state.choices[idx].title}
                                       onChange={this.handleChoiceChange}
                                />
                                <button className='btn btn-outline-dark minus_btn' onClick={this.deleteChoice} id={idx}
                                        type="button">-
                                </button>
                            </div>
                        );
                    })
                }
            </div>);
    };

    render() {
        return (
            <div className="col align-self-start">
                <form onSubmit={this.handleSubmit} className='field_form'>
                    <div className='checkbox_position'>
                        <label>
                            <input name="text"
                                   type="checkbox"
                                   checked={this.state.text}
                                   onChange={this.handleTypeChange}/>
                            Text
                        </label>
                        <label>
                            <input name="dropdown"
                                   type="checkbox"
                                   checked={this.state.dropdown}
                                   onChange={this.handleTypeChange}/>
                            Dropdown
                        </label>
                    </div>
                    <label>
                        Title:
                        <input className='title_input' type="text" name="title" value={this.state.title}
                               onChange={this.handleInputChange}/>
                    </label>
                    {
                        this.state.dropdown &&
                            <div>
                                { this.renderButton() }
                                <label>
                                    <input name="is_multichoice"
                                           type="checkbox"
                                           checked={this.state.is_multichoice}
                                           onChange={this.handleInputChange}/>
                                    Is multichoice
                                </label>
                            </div>
                    }
                    <input className='btn btn-outline-dark field_form_btn' type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default PostField;