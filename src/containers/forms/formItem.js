import React, { Component } from 'react';
import axios from 'axios';

class FormItem extends Component {
    state = {
        title: undefined,
        description: undefined,
        id: undefined
    };

    getData = () => {
        axios.get(`http://127.0.0.1:5050/form/${this.state.id}`).then(response => {
            const form = response.data;
            this.setState({title: form.title});
            this.setState({description: form.description});
            this.setState({id: form.id});
        });
    };

    render(){
        return (
            <div>
                <FormItem getData={this.getData} />
                <p>{ this.state.title }</p>
                <p>{ this.state.description }</p>
            </div>
        );
    }
}

export default FormItem;
