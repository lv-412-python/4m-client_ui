import React, {Component} from 'react';
import axios from 'axios';


class UserAnswers extends Component {
    state = {
        answers: []
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
                this.setState({answers});
            }
            );

    }

    render(){
        return(
            <div>
                <h2>Sorry, you already answered this form</h2>
            </div>
        );
    }
}
export default UserAnswers;
