import 'core-js/fn/object/assign';
import React from 'react';
// import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import Home from './pages/Home.js';

require('styles/app.css');

// Render the router into the dom

render((
    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
    </Router>
), document.getElementById('app'));