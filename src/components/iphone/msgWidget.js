import React from 'react';
require('styles/msgWidget.css');

class MsgWidget extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log();
        return (
            <div className='msg-widget'>
                <div className='widget-header clearfix'>
                    <span className='header-icon fl'>
                        <img src={this.props.config.headerIcon} alt='icon'/>
                    </span>
                    <span className='header-txt fl'>{this.props.config.headerTxt}</span>
                    <span className='header-time fr'>{this.props.config.time}</span>
                </div>
                <div className='widget-body'>
                    <p className='widget-body-txt'>{this.props.config.content1}</p>
                    <p className='widget-body-txt'>{this.props.config.content2}</p>
                    <p className='widget-body-txt'>{this.props.config.content3}</p>
                </div>
            </div>
        );
    }
}

export default MsgWidget;