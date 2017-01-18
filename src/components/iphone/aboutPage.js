import React from 'react';
import StateBar from 'components/iphone/stateBar.js';

require('styles/aboutPage.css');


class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='about-page'>
                <StateBar theme='dark'/>
                <div className='app-top-bar'>
                    <div className='return-btn' onClick={this.goBack}></div>
                    <div className='app-title'>关于</div>
                </div>
                <div className='slide-part'>
                </div>
            </div>
        );
    }
}

export default AboutPage;
