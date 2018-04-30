import React from 'react';
import PropTypes from 'prop-types';

export default class Controller extends React.Component {
  static propTypes = {
    handleAdd: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  handleAdd = (e) => {
    e.preventDefault()

    this.props.handleAdd()
  }

  handleDelete = (e) => {
    e.preventDefault()

    this.props.handleDelete()
  }

  render() {
    return (
      <div className="modal-dialog-controll-group">
        <button
          className="btn btn-primary"
          onClick={this.handleAdd}
        >
          添加
        </button>
        <button
          className="btn btn-gray"
          onClick={this.handleDelete}
        >
          删除
        </button>
      </div>
    )
  }
}