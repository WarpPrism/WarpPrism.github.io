import React from 'react';
import StateBar from 'components/iphone/stateBar.js';

require('styles/msgBoard.css');

class MsgBoard extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(() => {
            if ($('#ds-reset').length <= 0) {
                window.location.reload();
            }
        }, 1000);
    }
    render() {
        return (
            <div className='msg-board'>
                <StateBar theme='dark'/>

                <div className='app-top-bar'>
                    <div className='return-btn' onClick={this.goBack}></div>
                    <div className='app-title'>留言</div>
                </div>
                <div className='slide-part'>
                    <div className='boss-message'>如果你对本网站有什么意见或建议，欢迎在下方评论。 😃</div>
                    <div className="ds-thread" data-thread-key="msgboard" data-title="" data-url="https://warpprism.github.io/#/iphone_msg_board"></div>                
                </div>
            </div>
        );
    }
    goBack() {
        window.location.hash = '#iphone_home';
    }
}

export default MsgBoard;