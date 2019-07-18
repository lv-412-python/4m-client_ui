import React, { Component } from 'react';
import axios from 'axios';

class FormItem extends Component {
    state = {
        'title': this.props.title,
        'desc': this.props.desc,
        'id': this.props.id,
        'fields': []
    }

    getMoreInfo= () => {
        axios.get(`http://127.0.0.1:9000/form/${this.state.id}`).then(response => {
        const form = response.data;
        this.setState({fields:form.fields});
      })

    } 
    render () {
      return (
        <div>
          <p>
            {this.state.title}
            {this.state.desc}
            {this.state.fields}
            <input type='button' onClick={this.getMoreInfo} value='Get fields id'/>
        </p>
        </div>
      );
    }
}

export default FormItem;
