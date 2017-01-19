import 'core-js/fn/object/assign';
import React from 'react';
// import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Iphone from 'components/iphone/iphone.js';
import LockScreen from 'components/iphone/lockScreen';
import IphoneHome from 'components/iphone/home.js';
/* Page */
import BlogIssue from 'components/iphone/blogIssue.js';
import ProjectPage from 'components/iphone/projectPage.js';
import AboutPage from 'components/iphone/aboutPage.js';
import MsgBoard from 'components/iphone/msgBoard.js';

/* App */
import WeatherApp from 'components/app/weather.js';

require('normalize.css/normalize.css');
require('styles/app.css');

window.dsINIT = false;
// Render the router into the dom

render((
    <Router history={hashHistory}>
        <Route path='/' component={Iphone}>
            <IndexRoute component={LockScreen}/>
            <Route path='/iphone_lock' component={LockScreen}/>
            <Route path='/iphone_home' component={IphoneHome}/>
            <Route path='/iphone_blog' component={BlogIssue}/>
            <Route path='/iphone_projects' component={ProjectPage}/>
            <Route path='/iphone_about' component={AboutPage}/>
            <Route path='/iphone_msg_board' component={MsgBoard}/>
            <Route path='/iphone_weather' component={WeatherApp}/>
        </Route>
    </Router>
), document.getElementById('app'));