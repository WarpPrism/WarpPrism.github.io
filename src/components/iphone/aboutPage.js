import React from 'react';
import StateBar from 'components/iphone/stateBar.js';

require('styles/aboutPage.css');


class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='about-page'>
                <StateBar theme='dark'/>
                <div className='app-top-bar'>
                    <div className='return-btn' onClick={this.goBack}></div>
                    <div className='app-title'>关于</div>
                </div>
                <div className='slide-part'>
                    <div className='about-section'>
                        <header className='section-header'>关于项目</header>
                        <p className='section-content'>这是一个参照iPhone6设计的博客主题网站，我在此基础上会实现一些有趣的小功能，方便日常学习和练手。整个项目采用了以下技术栈：</p>
                        <ul className='section-list'>
                            <li>React (将整个项目组件化)</li> 
                            <li>React Router (构建SPA模拟iPhone的切屏)</li> 
                            <li>Webpack (负责项目的打包构建)</li> 
                            <li>Github Page (项目发布的平台)</li> 
                            <li>...</li> 
                        </ul>
                    </div>
                    <div className='about-section'>
                        <header className='section-header'>联系开发者</header>
                        <p className='section-content'></p>
                        <ul className='section-list'>
                            <li>GuangZhou | Sun Yat-sen University</li>
                            <li>zhoujh.fe@gmail.com</li>
                            <li><a href='https://github.com/WarpPrism' target='_blank'>https://github.com/WarpPrism</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    goBack() {
        window.location.hash = '#iphone_home';
    }
}

export default AboutPage;
