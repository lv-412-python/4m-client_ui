import React, {Component} from 'react';
import axios from 'axios';
import FieldItem from '../fieldItem/fieldItem';
import FieldPost from "src/components/fields/fieldPost/fieldPost";


class FieldsList extends Component {
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

    componentDidMount() {
        this.getData();
    }

    newField = () => {
        this.setState({new_field: !this.state.new_field});
    };

    render() {
        return (
            <div className="field_list col align-self-start">
                <div className='new_field'>
                    <h4>Fields</h4>
                    <div className="field_list">
                        <div className='new_field background_color'>
                            <h4 className='padding-10px'>Fields</h4>
                            <button className='btn btn-dark new_field_btn' onClick={this.newField} type="button">+
                            </button>
                        </div>
                        <div className='background_color'>
                            {
                                this.state.new_field && <FieldPost/>
                            }
                        </div>
                        {this.state.fields.map(field => <FieldItem key={field.title}
                                                                   title={field.title}
                                                                   id={field.id}/>).reverse()}
                    </div>
                </div>
            </div>
        );
    }
}

export default FieldsList;
