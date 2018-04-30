import React from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends React.Component {
  static propTypes = {
    fieldName: PropTypes.string.isRequired
  }

  /**
   * 实现Field组件传的onChange事件
   */
  onChange = (event) => {
    const value = event.target.value
    this.props.onChange(value)
  }

  /**
   * 获取表单验证产生的错误信息
   */
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

    const text = value || ''

    return (
      <div className="modal-form-group" {...otherProps}>
        <label htmlFor="name" className="modal-form-label">
          {label}
        </label>
        <input 
          name={fieldName}
          className="modal-form-item"
          value={text}
          type="text"
          placeholder={placeholder}
          onChange={this.onChange}
        />
      </div> 
    )
  }
}
