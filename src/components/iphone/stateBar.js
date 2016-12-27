import React from 'react';
require('styles/stateBar.css');
// iPhone 顶部状态栏
class StateBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={'state-bar clearfix ' + ((this.props.theme=='dark')?'state-bar-dark':'')}>
                <div className='signal fl'>
                    <span className='signal-dot'></span>
                    <span className='signal-dot'></span>
                    <span className='signal-dot'></span>
                    <span className='signal-dot'></span>
                    <span className='signal-dot'></span>
                </div>
                <span className='wifi'></span>
                <span className='battery-txt'>100%</span>
                <span className='battery'></span>
            </div>
        );
    }
}

export default StateBar;