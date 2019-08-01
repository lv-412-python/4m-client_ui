import React, {Component} from 'react';
import axios from 'axios';

class PostField extends Component {
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

    handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://127.0.0.1/field';
        axios.post(url, this.state).then(() => {
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
                <button className='btn btn-outline-dark' onClick={this.addChoice} type="button">+</button>
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
                                <button className='btn btn-outline-dark' onClick={this.deleteChoice} id={idx}
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
                    <label>
                        Title:
                        <input className='title_input' type="text" name="title" value={this.state.title}
                               onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        <input name="has_autocomplete"
                               type="checkbox"
                               checked={this.state.has_autocomplete}
                               onChange={this.handleInputChange}/>
                        Has autocomplete
                    </label>
                    <label>
                        <input name="has_choice"
                               type="checkbox"
                               checked={this.state.has_choice}
                               onChange={this.handleInputChange}/>
                        Has choices
                    </label>
                    {this.state.has_choice ? this.renderButton() : null}
                    <label>
                        <input name="is_multichoice"
                               type="checkbox"
                               checked={this.state.is_multichoice}
                               onChange={this.handleInputChange}/>
                        Is multichoice
                    </label>
                    <input className='btn btn-outline-dark field_form_btn' type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default PostField;
