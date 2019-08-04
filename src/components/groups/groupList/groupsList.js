import React, { Component} from "react";
import axios from "axios";

import GroupListItem from '../groupListItems/groupListItems';
import OwnerGroups from '../ownerGroups/ownerGroup';

class GroupList extends Component {
    state = {
        groups: undefined,
        status: undefined
    }
    getGroups = (e) => {
        e.preventDefault();
        const owner = e.target.elements.owner.value;
        const gropsUrl = 'http://localhost/group';
        axios.get(gropsUrl, {params:{owner:owner}},
            {crossDomain: true}
            ).then(response => {
                const groups = response.data;
                const status = response.status;
                this.setState({status});
                this.setState({groups});
            });

    };

    render() {
        return(
            <div>
                <div className='container'>
                    <div>
                        <OwnerGroups getGroups={this.getGroups} /> 
                        {(this.state.groups && 
                            <div>
                                {this.state.groups.map(group =>{
                                    return (<GroupListItem key={group.id}
                                                        id={group.id}
                                                        title={group.title}
                                                        // eslint-disable-next-line react/prop-types
                                                        getGroup={this.props.getGroup} />);

                                })
                                }
                            </div>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupList;
