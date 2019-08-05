import React, { Component } from 'react';

class GroupListItem extends Component{

    render() {
        // eslint-disable-next-line react/prop-types
        var getGroup = this.props.getGroup;
        return(
            <div>
                 {/* eslint-disable-next-line react/prop-types */}
                <a href="" onClick={getGroup} value={this.props.id}>
                 {/* eslint-disable-next-line react/prop-types */}
                    { this.props.title }
                </a>
            </div>
        );
    }
}

export default GroupListItem;
