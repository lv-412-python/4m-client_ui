import React, { Component } from 'react';

class CreateGroup extends Component{
    state ={
        name: null
    }
    componentDidMount(){
        this.setState({
            name: 'Lev'
        });
    }
    render() {
        return(
            <div>
                <h1 color="red">Hello {this.state.name}!</h1>
            </div>
        );
    }
}

export default CreateGroup;
