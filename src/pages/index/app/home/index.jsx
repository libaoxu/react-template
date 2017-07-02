import React from 'react'
import { Link } from 'react-router'

export default class Index extends React.Component {
  render () {
    return (
      <div className="body">
        <h1>Stages list</h1>
        <ul role="nav">
          <li><Link to="/s1">ListView + Carousel</Link></li>
          <li><Link to="/s2">Tabs + ...</Link></li>
          <li><Link to="/s3">Form + ...</Link></li>
          <li><Link to="/todomvc">todomvc + ...</Link></li>
          <li><Link to="/todo-list">todo-list + ...</Link></li>
          <li><Link to="/shopping-cart">shopping-cart + ...</Link></li>
        </ul>
      </div>
    )
  }
}