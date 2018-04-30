import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Dialog extends React.Component {
  static defaultProps = {
    prefix: 'modal-dialog'
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    footerBtn: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
  }

  handleConfirm = (e) => {
    e.preventDefault()
    if (this.props.handleConfirm) {
      this.props.handleConfirm()
    }
  }

  render() {
    const {
      prefix,
      title,
      footerBtn,
      visible,
      children
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
        [`${prefix}-show`]: visible === true
      }
    )

    return (
      <div>
        <div className={overlayClasses}></div>
        <div className={classes}>
          <div className="modal-dialog-header">
            {title}
            <span className="modal-dialog-close" onClick={this.props.handleClose}>
              +
            </span>
          </div>
          <div className="modal-dialog-body">
            {children}
          </div>
          <div className="modal-dialog-footer">
            <button
              className="btn btn-primary modal-dialog-btn"
              onClick={this.handleConfirm}
            >
              {footerBtn}
            </button> 
          </div>
        </div>
      </div>
    )
  }
}