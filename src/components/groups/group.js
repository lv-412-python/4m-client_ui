import React, {Component} from 'react';
import {GroupList, ButtonNewGroup, CreateGroup, GetOneGroup} from 'src/components/groups';


class Group extends Component {
    state = {
        id: undefined,
        createGroup: false,
        getOneGroup: false
    };

    getGroup = (e) => {
        e.preventDefault();
        this.setState({'getOneGroup': !this.setState.getOneGroup});
        this.setState({id: e.target.attributes.value.value});
    };

    createGroup = (e) => {
        e.preventDefault();
        this.setState({
            createGroup: !this.state.createGroup
        });
    };

    render() {
        const someComponent = this.state.createGroup && <CreateGroup /> ||
                              this.state.getOneGroup && <GetOneGroup id ={this.state.id} /> ||
                              <GroupList getGroup={this.getGroup}/>;
        return(
            <div>
                {someComponent}
                <ButtonNewGroup className='btn btn-lg align-self-center' createGroup={this.createGroup}/>
            </div>
        );
    }
}

export default Group;
