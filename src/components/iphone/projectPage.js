import React from 'react';
import StateBar from 'components/iphone/stateBar.js';
import ProjectCard from 'components/iphone/projectCard.js';

require('styles/projectPage.css');


class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        // 所有项目的json数据
        this.state = {
            projects: []
        }
    }
    render() {
        return (
            <div className='project-page'>
                <StateBar theme='dark'/>
                <div className='app-top-bar'>
                    <div className='return-btn' onClick={this.goBack}></div>
                    <div className='app-title'>Projects</div>
                </div>
                <div className='slide-part'>
                    <ProjectCard />
                </div>
            </div>
        );
    }
    goBack(e) {
        if (window) {
            window.history.back();
        }
    } 
}

export default ProjectPage;