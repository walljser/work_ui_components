import React from 'react';
import PropTypes from 'prop-types';

export default class FileUpload extends React.Component {
  static propTyeps = {
    fieldName: PropTypes.string.isRequired,
    values: PropTypes.object
  }

  state = {
    uploaded: false
  }

  /**
   * 为了控制file选择了之后，样式的变化所做的处理
   * @param {*} nextProps 
   * @param {*} nextState 
   */
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.value !== this.props.value
      && typeof nextProps.value === 'undefined'
      && typeof this.props.value !== 'undefined'
    ) {
      this.setState({
        uploaded: false
      })
    }
  }

  /**
   * 调用Field组件暴露出来的onChange接口
   */
  onChange = (value) => {
    this.props.onChange(value)
  }

  getErrorMessage() {
    const { errorMessage } = this.props
    return errorMessage
  }

  handleChange = (e) => {
    const value = e.target.files

    if (value.length > 0) {
      let file = value[0]

      this.setState({
        uploaded: true
      })

      this.onChange(file)
    } else {
      this.setState({
        uploaded: false
      })
    }
  }

  render() {
    const {
      fieldName,
      // errorMessage
    } = this.props

    const {
      label,
      placeholder,
      ...otherProps
    } = this.props.passProps

    const uploaded = this.state.uploaded

    return (
      <div className="modal-form-group" {...otherProps}>
        <label htmlFor="upload_image" className="modal-form-label">{label}</label>
        <label htmlFor="upload_image" className="modal-form-item modal-form-upload-btn">
          {
            uploaded ? (
              "上传成功"
            ) : placeholder
          }
        </label>
        <input
          type="file"
          name={fieldName}
          id="upload_image"
          className="modal-form-upload"
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
