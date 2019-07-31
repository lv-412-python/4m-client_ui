import React, { Component } from 'react';
import FieldsList from '../fields/fieldsList/fieldsList';
import NewForm from '../forms/newForm/newForm';


class FormField extends Component {
    render() {
        return (
          <div>
              <FieldsList />
              <NewForm />
          </div>
        );
    }
}

export default FormField;
