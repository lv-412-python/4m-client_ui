import React, { Component } from 'react';
import axios from 'axios';

class DemoForm extends Component
{
    state = [
        {
            'user_id': 0,
            'form_id': 10,
            'group_id': undefined,
            'reply': undefined,
            'field_id': 7
        },
        {
            'user_id': 0,
            'form_id': 10,
            'group_id': undefined,
            'reply': undefined,
            'field_id': 8
        },
        {
            'user_id': 0,
            'form_id': 10,
            'group_id': undefined,
            'reply': undefined,
            'field_id': 9
        }
    ];

    postAnswers = (e) =>  {
        e.preventDefault();
        const user_id = this.state[0].user_id + 1;
        const group_id = e.target.elements.group_id.value
        const prog_lang = e.target.elements.prog_lang.value;
        const eng_lvl = e.target.elements.eng_lvl.value;
        const course_feedback = e.target.elements.course_fdb.value
        this.state[0].user_id = this.state[1].user_id = this.state[2].user_id = user_id;
        this.state[0].group_id = this.state[1].group_id = this.state[2].group_id = group_id;
        this.state[0].reply = prog_lang;
        this.state[1].reply = eng_lvl;
        this.state[2].reply = course_feedback;
        const data = this.state;
        const answers_url = 'http://127.0.0.1:80/answers/';
        axios.post(answers_url, data).
        // eslint-disable-next-line no-console
            then(response => { console.log(response) }).
        // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    };
    
    render() {
        return (
          <form className="demoForm" onSubmit={this.postAnswers}>
              <div>
              <label>
                Group id:
                  <input type="number" min="1" name="group_id" value={this.state.group_id} />
              </label>
              </div>
              <div>
                <label>
                    Programming language:
                    <select name="prog_lang">
                        <option value="python">python</option>
                        <option value="java">java</option>
                        <option value="js">js</option>
                        <option value="c++">c++</option>
                        <option value="c">c</option>
                        <option value="c#">c#</option>
                        <option value="SQL">sql</option>
                    </select>
                </label>
              </div>
              <div>
                <label>
                    English level:
                    <select name="eng_lvl">
                        <option value="Low intermediate">Low intermediate</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="High intermediate">High intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Proficient">Proficient</option>
                    </select>
                </label>
              </div>
              <div>
                <label>
                    Course feedback:
                    <input name="course_fdb" type="text"/>
                </label>
              </div>
            <input className='btn btn-outline-dark' id="demoFormSubmit" type="submit" value="Submit" />
          </form>
        );
    }
}

export default DemoForm;
