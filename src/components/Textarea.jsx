import React from 'react';
import PropTypes from 'prop-types';

export default class Textarea extends React.Component {
  static propTypes = {
    fieldName: PropTypes.string.isRequired
  }

  /**
   * 实现Filed组件传来的onChange接口
   */
  onChange = (event) => {
    const value = event.target.value
    this.props.onChange(value)
  }

  getErrorMessage() {
    const { errorMessage } = this.props
    return errorMessage
  }

  render() {
    const {
      fieldName,
      // errorMessage,
      value
    } = this.props

    const {
      label,
      placeholder,
      ...otherProps
    } = this.props.passProps

    const textarea = value || ''

    return (
      <div className="modal-form-group">
        <label htmlFor="introduction" className="modal-form-label">简介</label>
        <textarea
          className="modal-form-item"
          id="introduction"
          name={fieldName}
          {...otherProps}
          value={textarea}
          onChange={this.onChange}
        >
        </textarea>
      </div>
    )
  }
}
