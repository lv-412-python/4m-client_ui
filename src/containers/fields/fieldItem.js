import React, { Component } from 'react';
import axios from 'axios';


class FieldItem extends Component
{
    state = {
        'id': this.props.id,
        'title': this.props.title,
        'has_choice': null,
        'is_multichoice': null,
        'has_autocomplete': null,
        'choices': []
    };

    getMoreInfo = () => {
        axios.get(`http://172.17.0.2:5053/field/${this.state.id}`).then(response => {
        const field = response.data;
        let object = null;
        if (field.has_choice)
        {
            object = {
            has_choice:field.has_choice,
            is_multichoice: field.is_multichoice,
            has_autocomplete: field.has_autocomplete,
            choices: field.choices
            };
        }
        else {
            object = {
            has_choice:field.has_choice,
            is_multichoice: field.is_multichoice,
            has_autocomplete: field.has_autocomplete
            };
        }
        this.setState(object);
        console.log(object);
        console.log(this.state);
      });
    };

    render() {
        return (
            <div>
              <p>
                {this.state.title}
                {this.state.is_multichoice}
                {this.state.has_choice}
                {this.state.has_autocomplete}
                <input type='button' onClick={this.getMoreInfo} value='Get more info' />
              </p>
           </div>
        );
    }
}

export default FieldItem;
