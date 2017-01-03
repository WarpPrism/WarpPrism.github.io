import React from 'react';
require('styles/searchBar.css');

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='search-bar clearfix' ref='searchBar'>
                <div className='search-input-wrap'>
                    <span className='search-logo'/>
                    <input className='search-input' onKeyUp={this.pressEnter.bind(this)}></input>
                </div>
                <div className='search-confirm fr' onClick={this.props.handler}>搜索</div>
            </div>
        );
    }
    pressEnter(e) {
        if (e.keyCode === 13) {
            this.props.handler(e);
        }
    }
}

export default SearchBar;