import React from 'react';
require('styles/fixedApps.css');

class FixedApps extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='fixed-apps'>
                <div className='blur-bg blur1'></div>
                <div className='app-wrap'>
                    <div className='app' onClick={this.goBlog}>
                        <div className='app-icon'>
                            <img src='images/iosicons/finder.png' alt='icon'/>
                        </div>
                        <div className='app-name'>博客</div>
                    </div>
                    <div className='app' onClick={this.goProject}>
                        <div className='app-icon'>
                            <img src='images/iosicons/game-center.png' alt='icon'/>
                        </div>
                        <div className='app-name'>项目</div>
                    </div>
                    <div className='app' onClick={this.goAbout}>
                        <div className='app-icon'>
                            <img src='images/iosicons/tips.png' alt='icon'/>
                        </div>
                        <div className='app-name'>关于</div>
                    </div>
                    <div className='app'>
                        <div className='app-icon'>
                            <img src='images/iosicons/messages.png' alt='icon'/>
                        </div>
                        <div className='app-name'>留言板</div>
                    </div>
                </div>
            </div>
        );
    }
    goBlog(e) {
        window.location.hash = '#iphone_blog';
    }
    goProject(e) {
        window.location.hash = '#iphone_projects';
    }
    goAbout(e) {
        window.location.hash = '#iphone_about';
    }
}

export default FixedApps;
