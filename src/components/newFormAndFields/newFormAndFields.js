import React, {Component} from 'react';
import NewFormHeader from './newFormHeader/newFormHeader';
import FieldsList from '../fields/fieldsList/fieldsList';
import NewForm from '../forms/newForm/newForm';

class FormField extends Component {
    state = {
        selectedItems: []
    };

    setSelectedItems = (item) => {
        this.setState({
            selectedItems: [...this.state.selectedItems, item],
        });

    };

    render() {
        return (
            <div>
                <NewFormHeader/>
                <div className='new row justify-content-around'>
                    <FieldsList setSelectedItems = {this.setSelectedItems}/>
                    <NewForm selectedItems={this.state.selectedItems} />
                </div>
            </div>
        );
    }
}

export default FormField;
