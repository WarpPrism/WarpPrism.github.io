import React from 'react';
import StateBar from 'components/iphone/stateBar.js';
import MainClock from 'components/iphone/mainClock.js';
import MsgWidget from 'components/iphone/msgWidget.js';
import FixedApps from 'components/iphone/fixedApps.js';
import MoreAppPage from 'components/iphone/moreAppPage.js';
import Modal from 'components/iphone/modal.js';
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
            },
            modal: 'show'
        };
        this.slideX = 0;
        this.slideY = 0;
        // mouse slide start signal
        this.$slide = false;
        this.slideStart = this.slideStart.bind(this);
        this.slideEnd = this.slideEnd.bind(this);
        this.sliding = this.sliding.bind(this);
        this.current_view = 1;
        this.slideDir = '';
    }
    render() {
        return (
            <div className='iphone-home'>
                <Modal state={this.state.modal} hideModal={this.hideModal.bind(this)}/>
                <StateBar />
                <div ref='slidePart' className='slide-part' onMouseDown={this.slideStart} onMouseMove={this.sliding} onMouseUp={this.slideEnd}>
                    <div className='slide-part-view1'>
                        <MainClock />
                        <div className='home-msg'>
                            <MsgWidget config={this.state.msgWidget}/>                
                        </div>
                    </div>
                    <div className='slide-part-view2'>
                        <MoreAppPage />
                    </div>
                </div>
                <FixedApps />
            </div>    
        );
    }
    showModal(e) {
        this.setState({
            modal: 'show'
        });
    }
    hideModal(e) {
        this.setState({
            modal: 'hide'
        });
    }
    // 处理滑动切换屏幕
    slideStart(e) {
        e.persist();
        var x = e.nativeEvent.clientX;
        var y = e.nativeEvent.clientY;
        this.slideX = x;
        this.slideY = y;
        this.$slide = true;
        this.slideInit = +this.refs.slidePart.style.left.replace('px', '');
    }
    sliding(e) {
        e.persist();
        var x = e.nativeEvent.clientX;
        var y = e.nativeEvent.clientY;
        var deltaX = x - this.slideX;
        if (deltaX > 0) {
            this.slideDir = 'right';
        } else if (deltaX < 0) {
            this.slideDir = 'left';
        }
        if (this.current_view == 1 && this.slideDir == 'right' && this.$slide) {return};
        if (this.current_view == 2 && this.slideDir == 'left' && this.$slide) {return};
        
        // if (this.refs.slidePart && this.$slide) {
        //     this.refs.slidePart.style.left = this.slideInit + deltaX + 'px';
        // }
    }
    slideEnd(e) {
        e.persist();
        var x = e.nativeEvent.clientX;
        var y = e.nativeEvent.clientY;
        this.$slide = false;
        var deltaX = x - this.slideX;
        if (deltaX > 0) {
            this.slideDir = 'right';
        } else if (deltaX < 0) {
            this.slideDir = 'left';
        }
        if (this.current_view == 1 && this.slideDir == 'right' && this.$slide) {return};
        if (this.current_view == 2 && this.slideDir == 'left' && this.$slide) {return};
        // 滑动差值需要大于20 才可以触发滑动操作, 数值越小，滑动操作越灵敏
        if (Math.abs(deltaX) < 20) {          
            this.refs.slidePart.style.left = this.slideInit + 'px';
            return;
        } else {
            if (this.current_view == 1 && this.slideDir == 'left') {
                this.refs.slidePart.style.left = '-100%';
                this.current_view = 2;
            } else if (this.current_view == 2 && this.slideDir == 'right') {
                this.refs.slidePart.style.left = '0';
                this.current_view = 1;
            }
        }
    }
}

export default IphoneHome;