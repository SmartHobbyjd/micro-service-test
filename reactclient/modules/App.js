import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import React from 'react'
import NavLink from './NavLink'
export default React.createClass({
  render() {
    return (
      <div>
        <h1 className={'hearder-title'}>React client for gRPC </h1>
        <ul className="nav" style={{ display: 'none' }}>
          <li className={'nav-item'}><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li className={'nav-item'}><NavLink to="/login">Login</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
