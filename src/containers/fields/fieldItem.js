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
        'choices': [],
        'show_info': false
    };

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        const url = `http://172.24.0.2/field/${this.state.id}`;
        axios.get(url).then(response => {
            const field = response.data;
            let object = null;
            if (field.has_choice)
            {
                object = {
                    has_choice:field.has_choice,
                    is_multichoice: field.is_multichoice,
                    has_autocomplete: field.has_autocomplete,
                    choices: field.choices,
                    };
            }
            else {
                object = {
                    has_choice:field.has_choice,
                    is_multichoice: field.is_multichoice,
                    has_autocomplete: field.has_autocomplete,
                    };
            }
            this.setState(object);
        });
    };

    getMoreInfo = () => {
        this.setState({show_info: !this.state.show_info});
    };

    delete = () => {
          const url = `http://172.24.0.2/field/${this.state.id}`;
          axios.delete(url).
            then(() => { window.location.reload() }).
            catch(error => { console.log(error) });
          alert('Deleted: ' + this.state.title);
    };

    render() {
        return (
            <div>
              <p>
                {this.state.title}
                <button onClick={this.getMoreInfo} type="button">Get more info</button>
                {
                    this.state.show_info && (
                        <ul>
                            <li>Has autocomplete: { this.state.has_autocomplete? "True": "False" }</li>
                            <li>Has choices: { this.state.has_choice? "True": "False" }</li>
                            {
                                this.state.has_choice ? this.state.choices.map((el, id) => <ul key={id}><li>{el.title}</li> </ul>): null
                            }
                            <li>Has multichoice: { this.state.is_multichoice? "True": "False" }</li>
                        </ul>
                    )
                }
                <button onClick={this.delete} type="button">Delete</button>
              </p>
           </div>
        );
    }
}

export default FieldItem;
