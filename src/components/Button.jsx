import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.string
  }

  render() {
    const {
      type,
      children,
      className,
      ...others
    } = this.props

    const classes = classNames(
      'btn',
      {
        [`btn-${type}`]: type
      },
      className
    )

    return (
      <button {...others} className={classes}>
        {children}
      </button>
    )
  }
}