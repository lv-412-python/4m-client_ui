import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { USERS_SERVISE } from 'src/constants';

import  PieChartItem  from 'src/components/statistics/chartItem';

class ChooseGroup extends Component {

    state = {
        group_id: null,
        title: "",
        groupTitles: [],
        // eslint-disable-next-line react/prop-types
        form_id: this.props.form_id,
        // eslint-disable-next-line react/prop-types
        owner_id: null
    }

    getUser = () => {
        const userProfileURL = `${USERS_SERVISE}/users/id`;
        axios.get(userProfileURL, {
            crossDomain: true,
            withCredentials: true
            }).then(response => {
            this.setState({owner_id: response.data.id}});
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
    };

    // validateForm() {
    //     return this.state['title'].length != "";
    // }

    handleSelectChange = (selectedOption) => {
        this.setState(
            title = selectedOption,
            group_id = groupTitles.indexOf(selectedOption)
        );
    }

    getGroupsData = () => {

        const url = `${USERS_SERVISE}/group?owner_id=${this.state.owner_id}`;

        axios.get(url, { withCredentials: true, crossDomain: true }
        ).then( response => {
            let groupTitles = [];
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].assigned_to_forms['form_id'] == this.state.form_id) {
                    groupTitles.push(response.data[i].title);
                }
            }
            this.setState(...groupTitles);
        }).catch(error => {
            alert(error.response.data.error);
        });
    }

    componentWillMount() {
        this.getUser();
        this.getGroupsData();
    }

    render() {
        return (
            <div>
                <label htmlFor="forms-group">Groups, asigned to this form:</label>
                <PieChartItem
                    group_id = {this.state.group_id}
                    form_id = {this.state.form_id}
                />
                <Select
                    id="forms-group"
                    options={this.state.groupTitles}
                    onChange={this.handleSelectChange}
                />
            </div>
        );
    }
}

export default ChooseGroup;
