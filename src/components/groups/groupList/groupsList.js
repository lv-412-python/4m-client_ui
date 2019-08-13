import React, { Component} from "react";
import axios from "axios";
import { URL } from 'src/constants';
import {GroupListItem} from 'src/components/groups';
import "./groupList.css";

class GroupList extends Component {
    state = {
        groups: undefined,
        status: undefined,
        owner_id: undefined
    }

    getOwner = () => {
        const AUTH_STATUS_URL = `http://${URL}/users/profile`;
        axios.get(AUTH_STATUS_URL, {withCredentials: true}).
            then(response => {this.setState({
                owner_id: response.data.user_id
                }, ()=>{this.getGroups()}); 
            }).
            // eslint-disable-next-line no-console
            catch(error => { console.log(error) });
    };

    getGroups = () => {
        // e.preventDefault();
        const GET_GROUPS_URL = `http://${URL}/group`;
        axios.get(GET_GROUPS_URL, {params:{owner:this.state.owner_id}, withCredentials:true}
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
            <div className="group_list">
                {this.state.groups && 
                    <div>
                        {this.state.groups.map(group =>{
                            return (<GroupListItem key={group.id}
                                                id={group.id}
                                                title={group.title}
                                                // eslint-disable-next-line react/prop-types
                                                getGroup={this.props.getGroup} />);

                            })
                        }
                    </div>}
            </div>
        );
    }
}

export {GroupList};