import React from 'react';

require('styles/projectCard.css');


class ProjectCard extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(() => {
            $(this.refs.projectCard).addClass('project-card_anim');
        },50);
    }
    render() {
        return (
            <div className='project-card' ref='projectCard'>
                <div className='card-header'>
                    <img className='project-img' src={this.props.config.img} alt='img'/>
                </div>
                <div className='card-body'>
                    <header className='project-name'>{this.props.config.name}</header>                    
                    <p className='project-desc'>{'\"'+this.props.config.desc + '\"'}</p>
                </div>
                <div className='card-footer clearfix'>
                    <a className='project-link fr' href={this.props.config.github_url} target='_blank'>github</a>
                    <a className='project-link fr' href={this.props.config.demo_url} target='_blank' style={{'display':(this.props.config.demo_url)?'inline-block':'none'}}>demo</a>
                </div>
            </div>
        )
    }
}

export default ProjectCard;