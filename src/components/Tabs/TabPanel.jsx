import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class TabPanel extends Component {
  static defaultProps = {
    prefix: 'tab'
  }

  static propTypes = {
    tab: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    empty: PropTypes.bool
  }

  render() {
    const {
      children,
      active,
      empty,
      prefix
    } = this.props

    const classes = classNames(
      `${prefix}-content`,
      'content-main',
      {
        [`${prefix}-content-show`]: active
      }
    )

    return (
      <div className={classes}>
        {children} 
        {
          empty ? (
            <div className="content-empty-message">
              <div className="content-empty-logo">
              </div>
              暂无可用资源
            </div>
          ) : null
        }
      </div>
    )
  }
}