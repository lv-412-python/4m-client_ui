import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { MAIN, USERS_SERVISE } from 'src/constants';

import './header.css';

class Header extends Component {

    state = {
        element1: <Link className="nav-link nav-text" to="/registration">Sign up</Link>,
        element2: <Link className="nav-link nav-text" to="/signin">Sign in</Link>,
        element3: undefined,
        element4: undefined
    };

    signOut = () => {
        const url = `${USERS_SERVISE}/users/logout`;
        let signout = confirm("Sure you want to sign out?");
        if (signout){
            axios.post(url,  { withCredentials:true }
            ).then( () => {
                cookie.remove('session', { path: '/' });
                cookie.remove('admin', { path: '/' });
                window.location = `${MAIN}/signin`;
            });
        }
    }

    componentWillMount() {
        let condition = cookie.load("session") != undefined;
        if (condition) {
            this.setState({
                element1: <Link className="nav-link nav-text" to="/profile">Profile</Link>,
                element2: <Link className="nav-link nav-text" to="#" onClick={this.signOut}>Sign out</Link>,
                element3: <Link className="nav-link nav-text" to="/form">Forms</Link>,
                element4: <Link className="nav-link nav-text" to="/group">Groups</Link>,
            });
        } else {
            this.setState({
                element1: <Link className="nav-link nav-text" to="/registration">Sign up</Link>,
                element2: <Link className="nav-link nav-text" to="/signin">Sign in</Link>
            });
        }
    }

    render() {
        return (
            <div className="header">
                <nav className='navbar fixed-top navbar-expand-lg'>
                    <a className='logo' href='/'>4M</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <span className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="left-nav-items">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                {this.state.element3}
                            </li>
                            <li className="nav-item">
                                {this.state.element4}
                            </li>
                        </ul>
                    </div>
                    <div className='right-nav-items'>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                {this.state.element1}
                            </li>
                            <li className="nav-item active">
                                {this.state.element2}
                            </li>
                        </ul>
                    </div>
                    </span>
                </nav>
            </div>
        );
    }
}

export default Header;
