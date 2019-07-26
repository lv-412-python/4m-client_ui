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
            this.getFieldTitles();
        });
    };

    // getFieldTitles = () => {
    //     const fields_url = `http://127.0.0.1:80/field?field_id=7&field_id=8&field_id=9`;
    //     axios.get(fields_url, {crossDomain: true}).then(response => {
    //         const titles = {}
    //         response.data.map(function(field){
    //             titles.field_id = field.title;
    //         });
    //         // console.log(titles);
    //         // const status = response.status;
    //         this.state.answers = this.state.answers.map(function(answer){
    //             var id = answer.field_id
    //             answer.field_id = titles[id];
    //         });
    //         console.log("+++++++++++++++=THIS IS IT++++++++++++++++++");
    //         console.log(this.state.answers);
    //     });
    // }

    render() {
        return (
            <div className="divAnswers">
                <FormAnswers getAnswers={this.getAnswers}/>
                {(this.state.answers &&
                    <table className="tableAnswers">
                        <tbody>
                        <tr className="tableHeader">
                            <th>Group</th>
                            <th>Field</th>
                            <th>Reply</th>
                        </tr>
                        {this.state.answers.map((answer) => {
                            return (
                                <tr clasName="rowAnswer" key={answer.reply}>
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
