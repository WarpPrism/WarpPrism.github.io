import React from 'react';
import StateBar from 'components/iphone/stateBar.js';

require('styles/msgBoard.css');

class MsgBoard extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // setTimeout(() => {
        //     if ($('#ds-reset').length <= 0) {
        //         window.location.reload();
        //     }
        // }, 1000);
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
                    <iframe id='msgBoardIframe' src='https://warpprism.github.io/src/msgBoard.html' width='100%' height='100%' frameBorder='0'>
                        You browser doesn't support iframe technology.
                    </iframe>
                    {/*<iframe id='msgBoardIframe' src='msgBoard.html' width='100%' height='100%' frameBorder='0'>
                        You browser doesn't support iframe technology.
                    </iframe>*/}
                </div>
            </div>
        );
    }
    goBack() {
        window.location.hash = '#iphone_home';
    }
}

export default MsgBoard;