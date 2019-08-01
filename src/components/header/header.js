import React, {Component} from 'react';

import './header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <nav className='navbar fixed-top navbar-expand-lg'>
                    <a className='logo'>4M</a>
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
                                <a className="nav-link nav-text" href="/profile">Profile</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link nav-text" href="/logout">Sign out</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link nav-text" href="/login">Sign in</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link nav-text" href="/registration">Sign up</a>
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
