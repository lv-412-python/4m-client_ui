import React, {Component} from 'react';
import NewFormHeader from './newFormHeader/newFormHeader';
import FieldsList from '../fields/fieldsList/fieldsList';
import NewForm from '../forms/newForm/newForm';
import cookie from 'react-cookies';
import Page403 from "src/components/errorpages/page403";

class FormField extends Component {
    state = {
        selectedItems: []
    };

    removeField = (id) => {
        let index = null;
        const {selectedItems} = this.state;
        for (let i = 0; i < selectedItems.length; i++)
        {
            if (selectedItems[i].id == id)
            {
                index = i;
                break;
            }
        }
        selectedItems.splice(index, 1);
        this.setState({selectedItems});
    };

    setSelectedItems = (item) => {
        let exits = false;
        for(let el of this.state.selectedItems) {
            if (el.id === item.id)
            {
                exits = true;
                break;
            }
        }
        if (exits)
        {
            return;
        }
        this.setState({
            selectedItems: [...this.state.selectedItems, item],
        });

    };

    render() {
        let admin = cookie.load("admin");
        return admin === "True"?
        <div>
            <NewFormHeader/>
            <div className='new row justify-content-around'>
                <FieldsList setSelectedItems = {this.setSelectedItems}/>
                <NewForm selectedItems={this.state.selectedItems} removeField={this.removeField} />
            </div>
        </div>: <Page403 />;
    }
}

export default FormField;
