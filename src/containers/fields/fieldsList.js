import React, { Component } from 'react';
import axios from 'axios';
import FieldItem from './fieldItem';


class FieldsList extends Component
{
    state = {
        'fields': []
    };

    getData = () => {
      axios.get('http://172.17.0.2:5053/field').then(response => {
        const fields = response.data;
        this.setState({fields});
      });
    };

    componentDidMount(){
      this.getData();
    }

    render () {
      console.log(this.state.fields);
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
