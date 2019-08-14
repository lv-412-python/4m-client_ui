import React, { Component } from 'react';
import "./errorpage.css";


class Page403 extends Component {
    render() {
        return (
            <div className="page_403_body">
            <div className="scene">
                <div className="overlay"></div>
                <div className="overlay"></div>
                <div className="overlay"></div>
                <div className="overlay"></div>
                <span className="bg-403">403</span>
                <div className="text">
                    <span className="hero-text"></span>
                    <span className="msg">can&apos;t let <span>you</span> in.</span>
                    <span className="support">
    </span>
                </div>
                <div className="lock"></div>
            </div>
            </div>);
    }
}

export default Page403;
