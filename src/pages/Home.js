require('normalize.css/normalize.css');
require('styles/home.css');
var $ = require('jquery');
import React from 'react';


class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="home-wrap clearfix">
                <video className="vedio" poster="http://gerardcuadras.com/wp-content/themes/twentysixteen/video/For_Wes.jpg" autoPlay loop muted preload>
                    <source src="http://gerardcuadras.com/wp-content/themes/twentysixteen/video/For_Wes.webm" type="video/webm;codecs=&quot;vp8, vorbis&quot;"/>
                    <source src="http://gerardcuadras.com/wp-content/themes/twentysixteen/video/For_Wes.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                </video>
                <div className="home-intro">
                    <header className="home-header">Jihao's Blog</header>  
                    <p className="home-intro__txt home-intro__txt1">"The pure failure arrives when someone wasted his time in regreting the things have be done and worrying about the unknown future.</p>
                    <p className="home-intro__txt home-intro__txt2">Therefore we should hold our present and spare no effort to live a meaningful life.</p>
                    <p className="home-intro__txt home-intro__txt3">Not only for ourselves, but also for the things we cherish."</p>
                </div>
                <div className="home-nav">
                    <a href="https://github.com/WarpPrism/Blog/issues" className="home-nav-item blog-nav">Blog</a>
                    <a href="#" className="home-nav-item about-nav">About</a>
                    <a href="#" className="home-nav-item project-nav">Project</a>
                </div>
            </div>
        );
    }
}

export default Home;