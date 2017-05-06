import React from 'react';
import StateBar from 'components/iphone/stateBar.js';
import ProjectCard from 'components/iphone/projectCard.js';

require('styles/projectPage.css');


class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        // 所有项目的json数据
        this.state = {
            projects: [{
                name: 'WebImageProcessor',
                img: 'images/projects/camera.png',
                desc: 'A simple online image processor based on AngularJS and Tencent AlloyImage which can help user finish some simple image-processing tasks.',
                github_url: 'https://github.com/WarpPrism/WebImageProcessor',
                demo_url: 'https://warpprism.github.io/WebImageProcessor/ImageProcessor/'
            },{
                name: 'Stereo Matching (视差匹配)',
                img: 'images/projects/stereo.jpg',
                desc: 'DIP course project using pure javascript realize the 3 different matching algorithms.',
                github_url: 'https://github.com/WarpPrism/WebImageProcessor',
                demo_url: 'https://warpprism.github.io/WebImageProcessor/StereoMatching/'
            },{
                name: 'Datastory New Home',
                img: 'images/projects/data.png',
                desc: '大四实习项目，通过一个个vuejs组件构成整个官网，借助vue-router实现页面跳转，最后完善为基于vue服务端渲染的SPA页面。',
                github_url: 'https://github.com/WarpPrism/Datastory-New-Home',
                demo_url: 'http://www.datastory.com.cn'
            }, {
                name: 'iSYSU Wechat',
                img: 'images/projects/sysu.jpeg',
                desc: '中山大学官方公众号服务项目，负责期间主要做了H5游戏，活动页面，数据条件推送等内容，后台基于python tornado，前端涉及cocos2d, bootstrap, svg anim, jquery等',
                github_url: 'https://github.com/WarpPrism/iSYSU-Wechat'
            }, {
                name: 'Quorido (步步为营)',
                img: 'images/projects/quoridor.png',
                desc: '由同学实体棋类游戏产生的灵感，利用面向对象思想构建的canvas棋类小游戏，缺点是不能联机游戏 👻',
                github_url: 'https://github.com/WarpPrism/Quoridor',
                demo_url: 'https://warpprism.github.io/Quoridor/'
            }]
        }
    }
    render() {
        return (
            <div className='project-page'>
                <StateBar theme='dark'/>
                <div className='app-top-bar'>
                    <div className='return-btn' onClick={this.goBack}></div>
                    <div className='app-title'>我的项目</div>
                </div>
                <div className='slide-part'>
                    {
                        this.state.projects.map((p, index) => {
                            return (
                                <ProjectCard config={p} key={index}/>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
    goBack(e) {
        if (window) {
            window.location.hash = '#iphone_home';
        }
    } 
}

export default ProjectPage;