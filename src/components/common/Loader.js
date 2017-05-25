// loader组件，移动端存在显示问题
import React from 'react';
require('styles/common/loader.css');
 
class Loader extends React.Component {
    render() {
        return (
            <div className='loader' style={this.props.loading?{display: 'block'}:{display: 'none'}}>
                <div className='loader-bar'></div>            
                <div className='loader-bar'></div>            
                <div className='loader-bar'></div>            
                <div className='loader-bar'></div>            
                <div className='loader-bar'></div>            
                <div className='loader-bar'></div>            
                <div className='loader-bar'></div>            
                <div className='loader-bar'></div>     
                <span className='loader-txt'>Loading...</span>       
            </div>
        );
    }
}

export default Loader;