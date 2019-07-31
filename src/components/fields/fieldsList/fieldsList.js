import React, { Component } from 'react';
import axios from 'axios';
import FieldItem from '../fieldItem/fieldItem';
import FieldPost from "src/components/fields/fieldPost/fieldPost";


class FieldsList extends Component
{
    state = {
        'fields': [],
        'new_field': false
    };

    getData = () => {
        const url = 'http://127.0.0.1/field';
      axios.get(url).then(response => {
        const fields = response.data;
        this.setState({fields});
      });
    };

    componentDidMount(){
      this.getData();
    }

    newField = () => {
        this.setState({new_field: !this.state.new_field});
    };

    render () {
      return (
        <div>
            Fields
            <button className='btn btn-dark' onClick={this.newField} type="button">+</button>
                {
                    this.state.new_field && <FieldPost />
                }
          {this.state.fields.map(field => <FieldItem key={field.title}
                                                  title={field.title}
                                                  id={field.id} />)}
        </div>
      );
    }

}

export default FieldsList;
