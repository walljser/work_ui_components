import React from 'react';
import FieldPropType from './FieldPropType';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import keys from 'lodash/keys';
import get from 'lodash/get';

export default class Field extends React.Component {
  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    component: PropTypes.any,
    errorMessage: PropTypes.string
  }

  static contextTypes = {
    doc: PropTypes.object, // 仓库（values）
    onChange: PropTypes.func.isRequired, // values change event
    errorMessages: PropTypes.object, // 表单验证的错误信息
    form: PropTypes.any.isRequired, 
    parentFieldName: PropTypes.string
  }

  /**
   * get component from props
   * 
   * @returns 
   * @memberof Field
   */
  getComponent() {
    const { component } = this.props
    return component
  }

  /**
   * get value from context
   * 
   * @returns 
   * @memberof Field
   */
  getValue() {
    const doc = this.context.doc || {}
    return get(doc, this.getFieldName())
  }

  /**
   * get errorMessage from props
   */
  getErrorMessage() {
    const errorMessages = this.context.errorMessages || {}
    return (
      this.props.errorMessage ||
      errorMessages[this.getFieldName()] ||
      get(errorMessages, this.getFieldName())
    )
  }

  onChange = (value) => {
    this.context.onChange(this.getFieldName(), value)
  }

  /**
   * get field from props
   */
  getFieldName() {
    return this.props.fieldName
  }

  /**
   * 编辑给Component传递的props， 未定义在FieldPropType里的内容，封装在 props.passProps中
   * 
   * @returns 
   * @memberof Field
   */
  getChildProps() {
    const propOptions = omit(this.props, keys(Field.propTypes))
    const allowedKeys = keys({...FieldPropType})

    const notDefinedOptions = omit(propOptions, allowedKeys)

    return {
      value: this.getValue(),
      fieldName: this.getFieldName(),
      onChange: this.onChange,
      errorMessage: this.getErrorMessage(),
      form: this.context.form,
      passProps: notDefinedOptions
    }
  }

  render() {
    const component = this.getComponent()
    const element = React.createElement(component, this.getChildProps())
    return element
  }
}
