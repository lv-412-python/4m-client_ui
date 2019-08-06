import React, {Component} from 'react';
import cookie from 'react-cookies';

import './header.css';

class Header extends Component {

    state = {
        element1: <a className="nav-link nav-text" href="/registration">Sign up</a>,
        element2: <a className="nav-link nav-text" href="/login">Sign in</a>
    }

    componentWillMount() {
        let condition = cookie.load("session") != undefined;
        if (condition) {
            this.setState({
                element1: <a className="nav-link nav-text" href="/profile">Profile</a>,
                element2: <a className="nav-link nav-text" href="/logout">Sign out</a>
            });
        } else {
            this.setState({
                element1: <a className="nav-link nav-text" href="/registration">Sign up</a>,
                element2: <a className="nav-link nav-text" href="/login">Sign in</a>
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
                                <a className="nav-link nav-text" href="/form">Forms</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-text" href="/group">Groups</a>
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
