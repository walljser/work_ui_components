import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class PaginationItem extends React.Component {
  static defaultProps = {
    prefix: 'pagination'
  }

  static propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func
  }

  render() {
    const {
      prefix,
      children,
      active,
      onClick,
      others
    } = this.props

    const classes = classNames(
      `${prefix}-number`,
      {
        [`active`]: active
      }
    )

    return (
      <li className={classes} onClick={onClick} {...others}>
        {children}
      </li>
    )
  }
}