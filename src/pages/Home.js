require('normalize.css/normalize.css');
require('styles/home.css');
// var $ = require('jquery');
import React from 'react';
import Iphone from 'components/Home/iphone.js';


class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="home-wrap clearfix">
                <Iphone></Iphone>
            </div>
        );
    }
}

export default Home;


                // <video className="vedio" poster="http://gerardcuadras.com/wp-content/themes/twentysixteen/video/For_Wes.jpg" autoPlay loop muted preload>
                    // <source src="http://gerardcuadras.com/wp-content/themes/twentysixteen/video/For_Wes.webm" type="video/webm;codecs=&quot;vp8, vorbis&quot;"/>
                    // <source src="http://gerardcuadras.com/wp-content/themes/twentysixteen/video/For_Wes.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                // </video>
                // <div className="home-intro">
                    // <header className="home-header">Jihao's Blog</header>
                    // <p className="home-intro__txt home-intro__txt1"></p>
                    // <p className="home-intro__txt home-intro__txt2"></p>
                    // <p className="home-intro__txt home-intro__txt3">"</p>
                // </div>
                // <div className="home-nav">
                    // <a href="https://github.com/WarpPrism/Blog/issues" className="home-nav-item blog-nav">Blog</a>
                    // <a href="#" className="home-nav-item about-nav">About</a>
                    // <a href="#" className="home-nav-item project-nav">Project</a>
                // </div>