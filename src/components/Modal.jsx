import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Modal extends React.Component {
  static defaultProps = {
    prefix: 'modal'
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
  }

  /**
   * 关闭
   * 
   * @memberof Modal
   */
  handleClose = (e) => {
    e.preventDefault()

    this.props.handleClose()
  }

  /**
   * 确认按钮
   * 
   * @memberof Modal
   */
  handleConfirm = (e) => {
    e.preventDefault()

    this.props.handleConfirm()
  }

  render() {
    const {
      visible,
      prefix,
      children,
      title,
      footerBtn,
      footerDesc
    } = this.props

    const classes = classNames(
      `${prefix}`,
      {
        [`${prefix}-show`]: visible === true
      }
    )

    const overlayClasses = classNames(
      `${prefix}-overlay`,
      {
        [`${prefix}-overlay-show`]: visible === true
      }
    )

    return (
      <div>
        <div className={overlayClasses}>
        </div>
        <div className={classes}>
          <div className="modal-content">
            <div className="modal-header">
              {title}
              <span className="modal-close" onClick={this.handleClose}>
                +
              </span>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary modal-btn"
                onClick={this.handleConfirm}
              >
                {footerBtn}
              </button>
              <p>{footerDesc}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}