import React, { Component, PropTypes } from 'react'

export default class Todo extends Component {
  render() {
    return (
      <li
        onClick={this.props.onClick} >
        <span style={{ 
          'padding-right': '100px', 
          ...this.props.completed && { 
            textDecoration: 'line-through',
            cursor: 'default',
            color: '#ccc' 
          }}} >
          {this.props.text}
        </span>
        <span 
          onClick={(e) => {
            e.stopPropagation()
            this.props.onDeleteTodo()
          }}
          style={{ 'margin': '10px' }} >
          ✘</span>
      </li>
    )
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}