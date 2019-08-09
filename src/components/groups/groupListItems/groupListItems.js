import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class GroupListItem extends Component {

    render() {
        // eslint-disable-next-line react/prop-types
        let getGroup = this.props.getGroup;
        return (
            <div>
                {/* eslint-disable-next-line react/prop-types */}
                <h5 key={this.props.id}>
                    <Link
                        // eslint-disable-next-line react/prop-types
                        to={`group/${this.props.id}`}
                        onClick={getGroup}
                        // eslint-disable-next-line react/prop-types
                        value={this.props.id}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {this.props.title}
                    </Link>
                </h5>
            </div>
        );
    }
}

export {GroupListItem};
