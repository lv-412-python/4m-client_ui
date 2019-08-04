import React, {Component} from 'react';

import  { Link } from 'react-router-dom';

class ButtonNewGroup extends Component{
    state = {
        textButton : ''
    }

    changeText = () => {
        // eslint-disable-next-line react/prop-types
        if(this.props.checkStatus) {
            this.setState(
                {textButton: 'Back to grops'}
            );
        }else{
            this.setState(
                {textButton: 'New group'}
            );
        }
        return(this.state.textButton);
       
    };

    componentDidMount() {
        this.changeText();
    }
    render(){
        return(
            <div>
                <Link to='/new-group'>New group</Link>
            </div>
        );
    }
}

export default ButtonNewGroup;
