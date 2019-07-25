import React, { Component } from 'react';
import axios from 'axios';
import FieldItem from './fieldItem';


class FieldsList extends Component
{
    state = {
        'fields': []
    };

    getData = () => {
        const url = 'http://172.24.0.2/field';
      axios.get(url).then(response => {
        const fields = response.data;
        this.setState({fields});
      });
    };

    componentDidMount(){
      this.getData();
    }

    render () {
      return (
        <div>
          {this.state.fields.map(field => <FieldItem key={field.title}
                                                  title={field.title}
                                                  id={field.id} />)}
        </div>
      );
    }

}

export default FieldsList;
