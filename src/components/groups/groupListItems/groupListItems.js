import React, { Component } from 'react';


class GroupListItem extends Component{
    state = {
        title = this.props.title,
        members = this.props.members,
        forms = this.props.forms
    }
    render() {
        returt(
            <div>
                <h1>{this.state.title}</h1>
                <p>{ this.state.members }</p>
                <p> {this.state.forms} </p>
            </div>
        );
    }
}