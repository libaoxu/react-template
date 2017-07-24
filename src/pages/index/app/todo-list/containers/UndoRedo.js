import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { visibleTodosSelector } from '../selectors/todoSelector'

@connect(visibleTodosSelector)
export default class UndoRedo extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const {undoDisabled, redoDisabled, onRedo, onUndo } = this.props

    return (
      <p>
        <button onClick={onUndo} disabled={undoDisabled}>undo</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={onRedo} disabled={redoDisabled}>redo</button>
      </p>
    )
  }
}

UndoRedo.PropTypes = {
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired
}