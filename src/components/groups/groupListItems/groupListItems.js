import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./groupListItem.css";

class GroupListItem extends Component {

    render() {
        // eslint-disable-next-line react/prop-types
        let getGroup = this.props.getGroup;
        return (
            <div className="group_list_item all_groups">
                {/* eslint-disable-next-line react/prop-types */}
                <label key={this.props.id}>
                    <Link
                        // eslint-disable-next-line react/prop-types
                        to={`group/${this.props.id}`}
                        onClick={getGroup}
                        // eslint-disable-next-line react/prop-types
                        value={this.props.id}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {this.props.title}
                    </Link>
                </label>
            </div>
        );
    }
}

export {GroupListItem};
