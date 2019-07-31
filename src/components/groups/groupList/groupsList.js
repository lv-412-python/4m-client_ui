import React, { Component} from "react";
import axios from "axios";

class GroupList extends Component {
    state = {
        groups: undefined,
        status: undefined,
        title: undefined,
        members: undefined,
        assignedToForms: undefined
    }
    getGroups = (e) => {
        const gropsUrl = 'http://localhost/group';
        axios.get(gropsUrl, {crossDomain: true},
            ).then(response => {
                const groups = response.data;
                const status = response.status;
                this.setState({status});
                this.setState({groups});
            });

    };

    render() {
        return(
            <div className='container'>
                <div>
                    {(this.state.groups && 
                        <div>
                            {this.state.groups.map(group =>{
                                return (<GroupListItem key={group.title}
                                                      title={group.title}
                                                      members={group.members}
                                                      forms={group.assignedToForms}/>);

                            })
                            }
                        </div>)}
                </div>
            </div>
        );
    }
}

export default GroupList;
