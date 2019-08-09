import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
// import { URL } from 'src/constants';

class EditGroup extends Component {

    state = {
        title: this.props.title,
        selectedOption: null,
        getUsers: undefined,
        someList: undefined
    }
    createList = ()=>{
        let someList=[];
        this.state.getUsers.map(i =>{
            someList.push({value: i.user_id, label: i.email});
        });
        this.setState({someList:someList});
    }

    getUsers =()=> {
        axios.get('http://127.0.0.1/users', {withCredentials: true}
        ).then(response=>{
            this.setState({getUsers:response.data},()=>{this.createList()});
        });
    };

    handleTitleChange = (event) => {
        const value = event.target.value;
        this.setState({
            title: value,
        });
    };

    editGroup = (e) => {
        e.preventDefault();
        let members = [];
        this.state.selectedOption.map(userId=>{
            members.push(userId.value);
        });
        let body = {
            title:this.state.title,
            owner_id:this.props.owner,
            members: members,
            assigned_to_forms:this.props.forms
        };
        const put_url = `http://127.0.0.1/group/${this.props.id}`;
        axios.put(put_url, body, {withCredentials: true, crossDomain: true}
        ).then((response) => {
            // eslint-disable-next-line no-console
            console.log(response);
        }).catch((response) => {
            // eslint-disable-next-line no-console
            console.log(response);
        });
    };

    componentDidMount(){
        this.getUsers();
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });

        // console.log(this.state.someList);
    }

    render(){
        return (
            <div>
                <form onSubmit={this.editGroup}>
                    <label>
                        Title:
                        <input value={this.state.title} onChange={this.handleTitleChange} />
                    </label>
                        <Select
                        defaultValue={[...this.props.userEmail]}
                        options={this.state.someList}
                        onChange={this.handleChange}
                        isMulti
                        />
                    <input type="submit" value="Save" />
                </form>
            </div>
        );
    
    }


}

export {EditGroup};