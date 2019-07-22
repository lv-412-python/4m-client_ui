import React from 'react';

const AnswersForm = props => (
        <form onSubmit={props.getAnswers}>
            <label>Form id:
                <input type="number" min="1" name="form_id" />
            </label>
            <label>Group id:
                <input type="number" min="1" name="group_id" />
            </label>
            <div>
                <button>Get Answers</button>
            </div>
        </form>
    );


export default AnswersForm;