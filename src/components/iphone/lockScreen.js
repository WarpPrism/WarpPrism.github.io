import React from 'react';
import StateBar from 'components/iphone/stateBar.js';
import MainClock from 'components/iphone/mainClock.js';
require('styles/LockScreen.css');
// iPhone Lock Screen
class LockScreen extends React.Component {
    constructor(props) {
        super(props);
        this.slideX = 0;
        this.slideY = 0;
        // mouse slide start signal
        this.$slide = false;
        this.slideStart = this.slideStart.bind(this);
        this.slideEnd = this.slideEnd.bind(this);
        this.sliding = this.sliding.bind(this);
    }

    render() {
        return (
            <div className='lockScreen' onMouseDown={this.slideStart} onMouseMove={this.sliding} onMouseUp={this.slideEnd}>
                <StateBar />
                <div className='screen-body' ref='screenBody'>
                    <MainClock />
                    <div className='slide-unlock'>
                        <span className='slide-arrow'></span>滑动以解锁
                    </div>
                </div>
            </div>
        );
    }
    // 处理滑动解锁
    slideStart(e) {
        e.persist();
        var x = e.nativeEvent.clientX;
        var y = e.nativeEvent.clientY;
        this.slideX = x;
        this.slideY = y;
        this.$slide = true;
    }
    sliding(e) {
        e.persist();
        var x = e.nativeEvent.clientX;
        var y = e.nativeEvent.clientY;
        var deltaX = x - this.slideX;
        if (this.refs.screenBody && this.$slide && deltaX > 0) {
            this.refs.screenBody.style.left = deltaX + 'px';
        }
    }
    slideEnd(e) {
        e.persist();
        var x = e.nativeEvent.clientX;
        var y = e.nativeEvent.clientY;
        this.$slide = false;
        if (x - this.slideX < 100) {
            this.refs.screenBody.style.left = 0 + 'px';
            return;
        } else {

            window.location.hash = '#/iphone_home';
        }
    }
    
}
export default LockScreen;