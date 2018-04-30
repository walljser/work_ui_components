import React from 'react';
import { getNewValues } from './formUtils';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';

export default class Form extends React.Component {
  static defaultProps = {
    onChange: () => {},
    useFormTag: true
  }

  static childContextTypes = {
    doc: PropTypes.object, // 仓库（values)
    onChange: PropTypes.func.isRequired, // onChange event
    errorMessages: PropTypes.object, // 表单验证
    form: PropTypes.any
  }

  constructor(props) {
    super(props)

    this.state = {
      isSubmitting: false,
      errorMessages: {},
      values: this.props.state
    }
  }

  /**
   * 设置context
   * 
   * @returns 
   * @memberof Form
   */
  getChildContext() {
    return {
      doc: this.getValues(),
      onChange: this.onChange,
      errorMessages: this.getErrorMessages(),
      form: this
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== this.props.state || nextProps.fields !== this.props.fields) {
      // 当prop传入的state改变的时候，重置state
      this.setValues(null)
    }
  }

  /**
   * get values api
   * 
   * @returns 
   * @memberof Form
   */
  getValues() {
    const values = this.state.values || this.props.state || {}
    return values
  }

  /**
   * set values api
   */
  setValues = (values) => {
    this.setState({
      values: values
    })
  }

  /**
   * get error messages api
   * 
   * @memberof Form
   */
  getErrorMessages = () => {
    const { errorMessages } = this.state

    return errorMessages
  }
  
  /**
   * set error message api
   * 
   * @memberof Form
   */
  setErrorMessasges = (errors) => {
    this.setState({
      errorMessages: errors
    })
  }

  /**
   * on fields value change
   */
  onChange = (fieldName, fieldValue) => {
    let values = getNewValues(this.getValues(), fieldName, fieldValue)
    values = {
      ...this.state.values,
      ...values
    }

    this.setValues(values)
    this.props.onChange(values)
  }

  /**
   * submit form
   */
  submit = async () => {
    if (this.props.validate) {
      await this.runValidations()

      const errorMessages = this.getErrorMessages()
      const isValid = keys(errorMessages).length === 0

      this.setState({
        isSubmitting: isValid
      })

      if (isValid) {
        this.executeSubmit()
      }

    } else {
      this.executeSubmit()
    }
  }

  /**
   * execute submit event
   * 
   * @memberof Form
   */
  executeSubmit = () => {
    const values = this.getValues()
    this.props.onSubmit(values)
  }

  // 表单验证，需编写validate函数传入props
  runValidations = () => {
    if (this.props.validate) {
      const values = this.getValues()

      const errorMessages = this.props.validate(values)
      this.setErrorMessasges(errorMessages)
    }
  }

  render() {
    const {
      className,
      children,
      useFormTag,
      onChange,
      state,
      fields,
      validate,
      ...props
    } = this.props

    if (useFormTag) {
      return (
        <form {...props} onSubmit={this.submit}>
          {children}
        </form>
      )
    } else {
      return (
        <div {...props}>
          {children}
        </div>
      )
    }
  }
}
