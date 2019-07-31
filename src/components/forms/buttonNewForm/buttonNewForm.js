import React, {Component} from 'react';

import './buttonNewForm.css';

class ButtonNew extends Component {
    render() {
        return (
            <div className='create_new'>
                <form action='/new'>
                    <button className='btn-lg btn-outline-dark text-center btn_new'>Create new form</button>
                </form>
            </div>
        );
    }
}

export default ButtonNew;
