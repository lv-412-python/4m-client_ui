import React, { Component } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { USERS_SERVISE } from 'src/constants';

class PieChartItem extends Component {

    state = {
        // eslint-disable-next-line react/prop-types
        form_id: this.props.form_id,
        // eslint-disable-next-line react/prop-types
        group_id: this.props.group_id,
        labels: ['Answered', 'Not answered'],
        datasets: [{
            data: [],
            backgroundColor: ['#0088FE', '#00C49F']
        }]
    }

    getChartData = () => {
        const url = `${USERS_SERVISE}/answers/statistics?form_id=${this.state.form_id}&group_id=${this.state.group_id}`;

        axios.get(url, { withCredentials: true, crossDomain: true }
        ).then( response => {
                let datasets = [{
                    data: [response.data.answered, response.data.users - response.data.answered],
                    backgroundColor: ['#0088FE', '#00C49F']
                }];

                this.setState(...datasets);
            }
        ).catch(error => {
            alert(error.response.data.error);
        });

    }

    componentDidMount() {
        this.getChartData();
    }

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

    render() {
        return (
            <div>
                <label>Group answers:</label>
                <Pie
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets
                        }}>
                </Pie>
            </div>
        );
    }
}

export default PieChartItem;
