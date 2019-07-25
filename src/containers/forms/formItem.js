import React, {Component} from 'react';
import axios from 'axios';

class FormItem extends Component {
    state = {
        description: undefined,
        fields: undefined,
        form_id: undefined,
        owner: undefined,
        title: undefined
    };
    getData = () => {
        // eslint-disable-next-line react/prop-types
        axios.get(`http://127.0.0.1:5050/form/${this.props.match.params.id}`).then(response => {
            // eslint-disable-next-line no-console
            console.log(response.data);
            this.setState({...response.data});
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.log(error.data);
        });
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12 form_item text_form'>
                        <p className='title_form'>{this.state.title}</p>
                        <p>{this.state.description}</p>
                        <p>{this.state.fields}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormItem;
