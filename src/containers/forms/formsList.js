import React, { Component } from 'react';
import axios from 'axios';
import FormItem from './formItem';

class FormsList extends Component {
    state = {
      'forms': []
    }
    getData = () => {
      axios.get('http://127.0.0.1:9000/form?owner=2', {crossDomain:true}).then(response => {
        const forms = response.data;
        this.setState({forms});
      })
    }

    componentDidMount(){
      this.getData();
    }

    render () {
      console.log(this.state.forms)
      return (
        <div>
          {this.state.forms.map(form => <FormItem key={form.title}
                                                  title={form.title}
                                                  desc={form.description}
                                                  id={form.form_id} />)}
        </div>
      );
    }
}

export default FormsList;
