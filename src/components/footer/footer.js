import React from 'react';

import './footer.css';

const Footer = () => {
    return (
        <footer className='content fixed-bottom'>
            <div className='footer_links'>
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <div>
                    <a href='https://github.com/lv-412-python' target='_blank'>Github</a>
                </div>
                <p>Designed and built with all the love in the world by the
                    LV-412 team with the help of our mentor and tech-expert.</p>
            </div>
        </footer>
    );
};

export default Footer;
