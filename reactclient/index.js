import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Home from './modules/Home'
import Login from './modules/Login'


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/login" component={Login}/>
    </Route>
  </Router>
), document.getElementById('app'))
