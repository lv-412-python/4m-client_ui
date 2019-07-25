import React, {Component} from 'react';

class ButtonNew extends Component {
    render() {
        return (
            <div>
                <form action='/new'>
                    <button className='btn-lg btn-outline-dark text-center btn_new'>Create new form</button>
                </form>
            </div>
        );
    }
}

export default ButtonNew;
