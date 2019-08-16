import React, {Component} from 'react';
import axios from 'axios';


class UserAnswers extends Component {
    state = {
        answers: undefined,
        fields: undefined
    }
    getUserAnswers(){
        const answersURL = 'http://127.0.0.1/answers';
        axios.get(answersURL, {
            crossDomain: true,
            withCredentials:true,
            params: {
                user_id: this.props.userId,
                form_id: this.props.formId
            }
            }).then(response => {
                const answers = response.data;
                this.setState({answers}, ()=> this.getFieldTitles());
            }
            );
    }

    getFieldTitles(){
        let fields = {}
        this.props.fields.map( field => {
            console.log(field.id, field.title);
            fields[field.id] = field.title;
        });
        this.setState({fields})
    }

    componentDidMount(){
        this.getUserAnswers();
    }

    render(){
        return(
            <div>
                <h2>Sorry, you already answered this form</h2>
                { this.state.answers &&
                    this.state.answers.map( answer => {
                        <div>
                            <h4>{answer.field_id}</h4>
                            <p>{answer.reply}</p>
                        </div>
                    })
                }
            </div>
        );
    }
}
export default UserAnswers;
