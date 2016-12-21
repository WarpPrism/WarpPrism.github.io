import React from 'react';
import StateBar from 'components/iphone/stateBar.js';
import MainClock from 'components/iphone/mainClock.js';
import MsgWidget from 'components/iphone/msgWidget.js';
import FixedApps from 'components/iphone/fixedApps.js';
require('styles/home.css');

class IphoneHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgWidget: {
                headerTxt: 'MESSAGES',
                headerIcon: 'images/iosicons/messages.png',
                time: 'now',
                content1: 'The pure failure arrives when someone wasted his time in regreting the things have be done and worrying about the unknown future.',
                content2: 'Therefore we should hold our present and spare no effort to live a meaningful life.',
                content3: 'Not only for ourselves, but also for the things we cherish.'
            }
        };
    }
    render() {
        return (
            <div className='iphone-home'>
                <StateBar />
                <div className='slide-part'>
                    <MainClock />
                    <div className='home-msg'>
                        <MsgWidget config={this.state.msgWidget}/>                
                    </div>
                </div>
                <FixedApps />
            </div>    
        );
    }
}

export default IphoneHome;