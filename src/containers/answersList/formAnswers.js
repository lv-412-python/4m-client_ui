import React from 'react';

const AnswersForm = props => (
    // eslint-disable-next-line react/prop-types
    <form onSubmit={props.getAnswers}>
        <label>Form id:
            <input type="number" min="1" name="form_id"/>
        </label>
        <label>Group id:
            <input type="number" min="1" name="group_id"/>
        </label>
        <div>
            <button className='btn btn-outline-dark answersBtn'>Get Answers</button>
        </div>
    </form>
);


export default AnswersForm;