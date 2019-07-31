import React, {Component} from 'react';
import NewFormHeader from './newFormHeader/newFormHeader';
import FieldsList from '../fields/fieldsList/fieldsList';
import NewForm from '../forms/newForm/newForm';


class FormField extends Component {
    render() {
        return (
            <div>
                <NewFormHeader/>
                <div className='new row justify-content-around'>
                    <FieldsList/>
                    <NewForm/>
                </div>
            </div>
        );
    }
}

export default FormField;
