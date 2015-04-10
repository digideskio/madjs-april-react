'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');
var TodoCollection = require('../utils/TodoCollection');
var TodoTextInput = require('./TodoTextInput');

var TodoItem = React.createClass({

  propTypes: {
   todo: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  render: function() {
    var todo = this.props.todo;
    var input;

    if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.title}
        />;
    }

    return (
      <li
        className={cx({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.title}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  },

  _onToggleComplete: function() {
    TodoCollection.toggleComplete(this.props.index);
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    TodoCollection.updateText(this.props.index, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    TodoCollection.destroy(this.props.index);
  }
});

module.exports = TodoItem;