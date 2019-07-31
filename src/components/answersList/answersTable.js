import React from 'react';
import axios from 'axios';

import FormAnswers from './formAnswers';

class AnswersTable extends React.Component {
    state = {
        answers: undefined,
        status: undefined
    };

    getAnswers = e => {
        e.preventDefault();
        const form_id = e.target.elements.form_id.value;
        const group_id = e.target.elements.group_id.value || undefined;
        const answer_url = `http://127.0.0.1:80/answers/`;
        axios.get(answer_url, {params: {form_id: form_id, group_id: group_id}}, {crossDomain: true}).then(response => {
            const answers = response.data;
            const status = response.status;
            this.setState({status});
            this.setState({answers});
        });
    };

    render() {
        return (
            <div>
                <FormAnswers getAnswers={this.getAnswers}/>
                {(this.state.answers &&
                    <table>
                        <tbody>
                        <tr>
                            <th>Group</th>
                            <th>Field</th>
                            <th>Reply</th>
                        </tr>
                        {this.state.answers.map((answer) => {
                            return (
                                <tr key={answer.reply}>
                                    <td>{answer.group_id}</td>
                                    <td>{answer.field_id}</td>
                                    <td>{answer.reply}</td>
                                </tr>);
                        })}
                        </tbody>
                    </table>)}
            </div>
        );
    }
}

export default AnswersTable;

