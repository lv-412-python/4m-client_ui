import React, {Component} from 'react';

import FormItem from './formItem/formItem';
import FormList from './formList/formList';
import FieldsList from "src/components/fields/fieldsList/fieldsList";
import FormEdit from "src/components/forms/formEdit/formEdit";

class Form extends Component {
    state = {
        form_id: undefined,
        getForm: false,
        edit: false,
        selectedItems: []
    };

    removeField = (id) => {
        let index = null;
        const {selectedItems} = this.state;
        for (let i = 0; i < selectedItems.length; i++) {
            if (selectedItems[i].id === id) {
                index = i;
                break;
            }
        }
        selectedItems.splice(index, 1);
        this.setState({selectedItems});
    };

    setSelectedItems = (item) => {
        let exits = false;
        for (let el of this.state.selectedItems) {
            if (el.id === item.id) {
                exits = true;
                break;
            }
        }
        if (exits) {
            return;
        }
        this.setState({
            selectedItems: [...this.state.selectedItems, item],
        });

    };

    changeEdit = () => {
        this.setState({edit: !this.setState.edit});
        this.setState({'getForm': false});
    };

    getForm = (e) => {
        e.preventDefault();
        this.setState({'getForm': !this.setState.getForm});
        this.setState({form_id: e.target.attributes.value.value});
    };

    render() {
        let someComponent;
        if (this.state.getForm) {
            someComponent = <FormItem edit={this.changeEdit} form_id={this.state.form_id}/>;
        } else if (this.state.edit) {
            // someComponent = <FormEdit  form_id={this.state.form_id} selectedItems={this.state.selectedItems}
            //                  removeField={this.removeField} owner={this.state.owner}/>;
            someComponent = <div className='new row justify-content-around'>
                <FieldsList setSelectedItems={this.setSelectedItems}/>
                <FormEdit form_id={this.state.form_id} selectedItems={this.state.selectedItems}
                          removeField={this.removeField} owner={this.state.owner}/>
            </div>;
        } else {
            someComponent = <FormList getForm={this.getForm}/>;
        }
        return (
            <div>
                {someComponent}
            </div>
        );
    }
}

export default Form;
