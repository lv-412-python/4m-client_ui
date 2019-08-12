import React, {Component} from 'react';
import axios from 'axios';
import FieldItem from '../fieldItem/fieldItem';
import FieldPost from "src/components/fields/fieldPost/fieldPost";

import './fieldsList.css';


class FieldsList extends Component {

    state = {
        fields: [],
        new_field: false,
        owner: null
    };

    getData = () => {
        const url = `http://127.0.0.1/field`;
        axios.get(url,{
            crossDomain: true,
            withCredentials: true
            }, {params: {owner: this.state.owner}}).then(response => {
            const fields = response.data;
            this.setState({fields});
        });
    };

    setNewFieldFalse = () => {
        this.setState({new_field: false});
    };

    componentDidMount() {
        const auth_status_url = 'http://127.0.0.1/users/profile';
        axios.get(auth_status_url,{
            crossDomain: true,
            withCredentials: true
            }).
        then(response => {
            this.setState({owner: response.data.user_id});
            this.getData();
        });
    }

    newField = () => {
        this.setState({new_field: !this.state.new_field});
    };

    render() {
        return (
            <div className="field_list">
                <div className='new_field background_color'>
                    <h4 className='fields'>Fields</h4>
                    <div className='new_field_btn'>
                    <button className='btn btn-dark' onClick={this.newField} type="button">+</button>
                    </div>
                </div>
                <div className='background_color'>
                    {
                        this.state.new_field && <FieldPost refresh={this.getData} newFieldFalse={this.setNewFieldFalse} />
                    }
                </div>
                {this.state.fields.map(field => <FieldItem key={field.id}
                                                           title={field.title}
                                                           id={field.id}
                                                           setSelectedItems={this.props.setSelectedItems}
                                                           refresh={this.getData} />).reverse()}
            </div>
        );
    }
}

export default FieldsList;
