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
                        <div className='ios-modal-title'>{this.props.title}</div>
                        <div className='ios-modal-msg'>{this.props.msg}</div>
                    </div>
                    <div className='ios-modal-ctrl clearfix flex'>
                        <div className={'ios-modal-btn_1 ios-modal-btn fl' + (this.props.option1==''?' dn':'')}>{this.props.option1}</div>
                        <div className='ios-modal-btn_0 ios-modal-btn fl' onClick={this.props.hideModal}>{this.props.option2}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;