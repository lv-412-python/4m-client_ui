import React, { Component } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

import './fieldImport.css';


class ImportDropdown extends Component {

    state = {
        fields: []
    };

    setSt = (fields) =>
    {
        this.setState({fields});
    };

    post = () => {
        event.preventDefault();
        const auth_status_url = 'http://127.0.0.1/users/profile';
        axios.get(auth_status_url, {withCredentials: true}).then(response => {
            let owner = response.data.user_id;
            const url = 'http://127.0.0.1/field';
            let {fields} = this.state;
            for(let i = 0; i < this.state.fields.length; i++)
            {
                fields[i]['owner'] = owner;
                axios.post(url, fields[i], {withCredentials: true}).then(() => {
                    this.props.newFieldFalse();
                    this.props.refresh();
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                });
            }
        });
    };

    onChangeHandler=event=>{
        Papa.parse(event.target.files[0], {
            header: true,
            post: this.post,
            setSt: this.setSt,
            complete: function (result) {
                let fields = [];
                let ind =0;
                for(let i=0;i<result.data.length;i++)
                {
                    let title = result.data[i].title;
                    let is_mult = result.data[i].is_multichoice;
                    let choices = [];
                    for (let j=i;;j++)
                    {
                        if(result.data[j].title==="")
                        {
                            break;
                        }
                        choices.push({title: result.data[j].choice});
                        ind = j;
                    }
                    fields.push({
                        title: title,
                        has_choice: true,
                        choices: choices,
                        is_multichoice: is_mult
                    });
                    i = ind + 1;
                }
                this.setSt(fields);
            }
        });
    };

    render() {
        return  <div className="form-group">
            <input className="btn btn-default" type="file" name="file" onChange={this.onChangeHandler} />
            <button type="btn btn-default" onClick={this.post}>Upload</button>
        </div>;
    }
}

class ImportText extends ImportDropdown{


    setSt = (fields) =>
    {
        this.setState({fields});
    };

    onChangeHandler=event=>{
        Papa.parse(event.target.files[0], {
            header: true,
            post: this.post,
            setSt: this.setSt,
            complete: function (result) {
                let fields = [];
                for(let i=0;i<result.data.length;i++)
                {
                    if(result.data[i].title==="")
                    {
                        break;
                    }
                    let title = result.data[i].title;
                    fields.push({
                        title: title,
                        has_choice: false,
                        is_multichoice: false
                    });
                }
                this.setSt(fields);
            }
        });
    };

}

export {ImportDropdown, ImportText};
