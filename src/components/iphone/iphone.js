import React from 'react';
require('styles/iphone.css');

class Iphone extends React.Component {
    render() {
        return (
            <div className='iphone'>
                <div className='iphone-top'>
                    <span className='camera'></span>
                    <span className='speaker'></span>
                    <span className='sensor'></span>
                </div>
                <div className='top-bar'></div>
                <div className='iphone-screen'>
                    {this.props.children}
                </div>
                <div className='buttons'>
                    <span className="sleep"></span>
                    <span className="on-off"></span>
                    <span className="up"></span>
                    <span className="down"></span>
                </div>
                <div className='bottom-bar'></div>
                <div className='iphone-bottom'>
                    <span className='home-btn'></span>
                </div>
            </div>
        )
    }
}

export default Iphone;