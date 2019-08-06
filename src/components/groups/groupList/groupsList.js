import React, { Component} from "react";
import axios from "axios";

import GroupListItem from '../groupListItems/groupListItems';

class GroupList extends Component {
    state = {
        groups: undefined,
        status: undefined,
        owner_id: undefined
    }

    getOwner = () => {
        const auth_status_url = 'http://127.0.0.1/users/status';

        axios.get(auth_status_url, {withCredentials: true}).
            then(response => {this.setState({
                owner_id: response.data.user_id
                }, ()=>{this.getGroups()}); 
            }).
            // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    };

    getGroups = () => {
        // e.preventDefault();
        const gropsUrl = 'http://localhost/group';
        axios.get(gropsUrl, {params:{owner:this.state.owner_id}},
            {crossDomain: true}
            ).then(response => {
                const groups = response.data;
                const status = response.status;
                this.setState({status});
                this.setState({groups});
            });

    };
    componentDidMount(){
        this.getOwner();
    }

    render() {
        return(
            <div>
                <div className='container'>
                    <div>
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
