import React from 'react';
require('styles/modal.css');

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={'ios-modal-fade ' + ((this.props.state=='show')?'':'ios-modal-destroy')} ref='iosModal'>
                <div className='ios-modal'>
                    <div className='ios-modal-bd'>
                        <div className='ios-modal-title'>微信</div>
                        <div className='ios-modal-msg'>您有一条新消息</div>
                    </div>
                    <div className='ios-modal-ctrl clearfix'>
                        <div className='ios-modal-btn_1 ios-modal-btn fl'>打开QQ</div>
                        <div className='ios-modal-btn_0 ios-modal-btn fl' onClick={this.props.hideModal}>关闭</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;