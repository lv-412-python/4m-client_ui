import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { USERS_SERVISE } from 'src/constants';

import  PieChartItem  from 'src/components/statistics/chartItem';

class ChooseGroup extends Component {

    state = {
        group_id: null,
        groups: [],
        // eslint-disable-next-line react/prop-types
        form_id: this.props.form_id,
        owner_id: null,
        chart: null
    }

    getUser = () => {
        const userProfileURL = `${USERS_SERVISE}/users/profile`;
        axios.get(userProfileURL, {
            crossDomain: true,
            withCredentials: true
            }).then(response => {
            this.setState({owner_id: response.data.user_id}, () => this.getGroupsData());
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
    };

    handleSelectChange = (selectedOption) => {
        this.setState({
            group_id: selectedOption.value
        }, () => this.handleSubmit() );
    }

    getGroupsData = () => {

        const url = `${USERS_SERVISE}/group?owner=${this.state.owner_id}`;

        axios.get(url, { withCredentials: true, crossDomain: true }
        ).then( response => {
            let groups = [];
            for (let i = 0; i < response.data.length; i++) {
                for (let j = 0; j < response.data[i].assigned_to_forms.length; j++) {
                    if (response.data[i].assigned_to_forms[j] == this.state.form_id) {
                        let group = {'value': response.data[i].id, 'label':response.data[i].title};
                        groups.push(group);
                        break;
                    }
                }
            }
            this.setState({groups:groups});
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
    }

    handleSubmit = () => {
        this.setState({
            chart: <PieChartItem
                        group_id = {this.state.group_id}
                        form_id = {this.state.form_id}
                    />
        });
    }

    componentWillMount() {
        this.getUser();
    }

    render() {
        return (
            <div>
                <label htmlFor="forms-group">Groups, asigned to this form:</label>
                <Select
                    id="forms-group"
                    options={this.state.groups}
                    onChange={this.handleSelectChange}
                />
                {this.state.chart}
            </div>
        );
    }
}

export default ChooseGroup;
