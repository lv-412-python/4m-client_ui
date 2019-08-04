import React, { Component } from 'react';

import GroupList from './groupList/groupsList';
import ButtonNewGroup from './buttonNewGroups/buttonNewGroups';
import CreateGroup from './createGroup/createGroup';
import GetOneGroup from './getOneGroup/getOneGroup';

class Group extends Component{
    state ={
        id: undefined,
        createGroup: false,
        getOneGroup: false
    }

    getGroup = (e) => {
        e.preventDefault();
        this.setState({'getOneGroup': !this.setState.getOneGroup});
        this.setState({id:e.target.attributes.value.value});
    }

    createGroup = (e) => {
        e.preventDefault();
        this.setState({
            createGroup: !this.state.createGroup
        });
    }

    render() {
        let someComponent;
        if (this.state.createGroup){
            someComponent = <CreateGroup />;
        }else if(this.state.getOneGroup){
            someComponent = <GetOneGroup id ={this.state.id} />;
        }else{
            someComponent = <GroupList getGroup={this.getGroup}/>;
        }
        return(
            <div>
                {someComponent}
                <ButtonNewGroup createGroup={this.createGroup}/>;
            </div>
        );
    }
}

export default Group;
